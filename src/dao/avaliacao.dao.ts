import { pool } from '../util/conexao';
import { Avaliacao } from '../modelo/avaliacao';
import { v4 as uuidv4 } from 'uuid';

export class AvaliacaoDAO {
  public async criar(dados: {
    livro_id: string;
    usuario_id: string;
    nota: number;
    comentario?: string;
  }): Promise<Avaliacao> {
    const id = uuidv4();
    const data = new Date();

    await pool.query(
      `INSERT INTO avaliacoes (id, livro_id, usuario_id, nota, comentario, data) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [id, dados.livro_id, dados.usuario_id, dados.nota, dados.comentario, data]
    );

    return Avaliacao.assemble({
      id,
      livro_id: dados.livro_id,
      usuario_id: dados.usuario_id,
      nota: dados.nota,
      comentario: dados.comentario,
      data,
    });
  }

  public async listarPorLivro(livro_id: string): Promise<Avaliacao[]> {
    const res = await pool.query(
      'SELECT * FROM avaliacoes WHERE livro_id = $1 ORDER BY data DESC',
      [livro_id]
    );

    return res.rows.map(row =>
      Avaliacao.assemble({
        id: row.id,
        livro_id: row.livro_id,
        usuario_id: row.usuario_id,
        nota: row.nota,
        comentario: row.comentario,
        data: row.data,
      })
    );
  }

  public async calcularMedia(livro_id: string): Promise<number> {
    const res = await pool.query(
      'SELECT AVG(nota) AS media FROM avaliacoes WHERE livro_id = $1',
      [livro_id]
    );
    return parseFloat(res.rows[0].media) || 0;
  }
}
