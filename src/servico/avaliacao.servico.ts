import { AvaliacaoDAO } from '../dao/avaliacao.dao';
import { AvaliacaoCreateDTO } from '../dto/avaliacao.dto';
import { Avaliacao } from '../modelo/avaliacao';
import { v4 as uuidv4 } from 'uuid';

export class AvaliacaoServico {
  private avaliacaoDAO: AvaliacaoDAO;

  constructor(avaliacaoDAO?: AvaliacaoDAO) {
    this.avaliacaoDAO = avaliacaoDAO ?? new AvaliacaoDAO();
  }

  async criarAvaliacao(dados: AvaliacaoCreateDTO): Promise<Avaliacao> {
    try {
      const novaAvaliacao: Avaliacao = {
        id: uuidv4(),
        livro_id: dados.livro_id,
        usuario_id: dados.usuario_id,
        nota: dados.nota,
        comentario: dados.comentario ?? undefined,
        criado: new Date(),
      };

      await this.avaliacaoDAO.criar(novaAvaliacao);
      return novaAvaliacao;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Erro ao criar avaliação');
    }
  }

  async calcularMediaNotas(livroId: string): Promise<number> {
    try {
      const media = await this.avaliacaoDAO.calcularMedia(livroId);
      return Number(media);
    } catch (error: unknown) {
      throw new Error('Erro ao calcular média de notas');
    }
  }

  async listarAvaliacoesPorLivro(livroId: string): Promise<Avaliacao[]> {
    try {
      const avaliacoes = await this.avaliacaoDAO.listarPorLivro(livroId);
      return avaliacoes ?? []; // evita erro de null
    } catch (error: unknown) {
      throw new Error('Erro ao listar avaliações do livro');
    }
  }
}
