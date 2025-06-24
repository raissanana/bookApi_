import { pool } from '../util/conexao';
import { Avaliacao } from '../modelo/avaliacao';
import { v4 as uuidv4 } from 'uuid';

export class AvaliacaoDAO {
  public async criar(avaliacao: Omit<Avaliacao, 'id' | 'data'>): Promise<Avaliacao> {
    try {
      const id = uuidv4();
      const criadoEm = new Date();

      await pool.query(
        `INSERT INTO avaliacoes (id, livro_id, usuario_id, nota, comentario, data) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [id, avaliacao.livro_id, avaliacao.usuario_id, avaliacao.nota, avaliacao.comentario, criadoEm]
      );

      return {
        id,
        livro_id: avaliacao.livro_id,
        usuario_id: avaliacao.usuario_id,
        nota: avaliacao.nota,
        comentario: avaliacao.comentario,
        criadoEm,
      };
    } catch (error) {
      console.error('Erro ao criar avaliação:', error);
      throw error;
    }
  }

  public async atualizar(
    id: string,
    dados: Partial<Omit<Avaliacao, 'id' | 'livro_id' | 'usuario_id' | 'data'>>
  ): Promise<Avaliacao | null> {
    try {
      const resBusca = await pool.query('SELECT * FROM avaliacoes WHERE id = $1', [id]);
      if (resBusca.rowCount === 0) {
        return null;
      }

      const avaliacaoExistente = resBusca.rows[0];
      const nota = dados.nota ?? avaliacaoExistente.nota;
      const comentario = dados.comentario ?? avaliacaoExistente.comentario;

      await pool.query(
        'UPDATE avaliacoes SET nota = $1, comentario = $2 WHERE id = $3',
        [nota, comentario, id]
      );

      const resAtualizado = await pool.query(
        'SELECT * FROM avaliacoes WHERE id = $1',
        [id]
      );

      return resAtualizado.rows[0] as Avaliacao;
    } catch (error) {
      console.error('Erro ao atualizar avaliação:', error);
      throw error;
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const res = await pool.query('DELETE FROM avaliacoes WHERE id = $1', [id]);
      return (res.rowCount ?? 0) > 0;
    } catch (error) {
      console.error('Erro ao deletar avaliação:', error);
      throw error;
    }
  }

  public async listarPorLivro(livro_id: string): Promise<Avaliacao[]> {
    try {
      const res = await pool.query(
        'SELECT * FROM avaliacoes WHERE livro_id = $1 ORDER BY data DESC',
        [livro_id]
      );
      return res.rows as Avaliacao[];
    } catch (error) {
      console.error('Erro ao listar avaliações por livro:', error);
      throw error;
    }
  }

  public async calcularMedia(livro_id: string): Promise<number> {
    try {
      const res = await pool.query(
        'SELECT AVG(nota) AS media FROM avaliacoes WHERE livro_id = $1',
        [livro_id]
      );
      return parseFloat(res.rows[0].media) || 0;
    } catch (error) {
      console.error('Erro ao calcular média:', error);
      throw error;
    }
  }
}
