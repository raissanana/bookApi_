import { pool } from '../util/conexao';
import { Livro } from '../modelo/livro';
import { v4 as uuidv4 } from 'uuid';

export class LivroDAO {
  async criarLivro(livro: Omit<Livro, 'id'>): Promise<Livro> {
    const id = uuidv4();
    const { titulo, autor, descricao, ano } = livro;

    await pool.query(
      'INSERT INTO livros (id, titulo, autor, descricao, ano) VALUES ($1, $2, $3, $4, $5)',
      [id, titulo, autor, descricao ?? null, ano ?? null]
    );

    return Livro.assemble({ id, titulo, autor, descricao, ano });
  }

  async buscarPorId(id: string): Promise<Livro | null> {
    const res = await pool.query('SELECT * FROM livros WHERE id = $1', [id]);
    if (res.rowCount === 0) return null;
    return res.rows[0] as Livro;
  }

  async buscarPorTituloOuAutor(busca: string): Promise<Livro[]> {
    const q = `%${busca.toLowerCase()}%`;
    const res = await pool.query(
      `SELECT * FROM livros WHERE LOWER(titulo) LIKE $1 OR LOWER(autor) LIKE $1`,
      [q]
    );
    return res.rows as Livro[];
  }

  async listarTodos(): Promise<Livro[]> {
    const res = await pool.query('SELECT * FROM livros');
    return res.rows as Livro[];
  }

  async atualizarLivro(id: string, dados: Partial<Omit<Livro, 'id'>>): Promise<Livro | null> {
    const livroExistente = await this.buscarPorId(id);
    if (!livroExistente) return null;

    const titulo = dados.titulo ?? livroExistente.titulo;
    const autor = dados.autor ?? livroExistente.autor;
    const descricao = dados.descricao ?? livroExistente.descricao;
    const ano = dados.ano ?? livroExistente.ano;

    await pool.query(
      'UPDATE livros SET titulo=$1, autor=$2, descricao=$3, ano=$4 WHERE id=$5',
      [titulo, autor, descricao, ano, id]
    );

    return Livro.assemble({ id, titulo, autor, descricao, ano });
  }

  async deletarLivro(id: string): Promise<boolean> {
    const res = await pool.query('DELETE FROM livros WHERE id=$1', [id]);
    return (res.rowCount ?? 0) > 0;
  }
}
