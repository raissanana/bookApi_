import { AvaliacaoDAO } from '../dao/avaliacao.dao';
import { AvaliacaoCreateDTO } from '../dto/avaliacao.dto';
import { Avaliacao } from '../modelo/avaliacao';

export class AvaliacaoServico {
  private avaliacaoDAO: AvaliacaoDAO;

  constructor(avaliacaoDAO?: AvaliacaoDAO) {
    this.avaliacaoDAO = avaliacaoDAO ?? new AvaliacaoDAO();
  }

  async criarAvaliacao(dados: AvaliacaoCreateDTO): Promise<Avaliacao> {
    try {
      return await this.avaliacaoDAO.criar(dados);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message); // já propaga a mensagem "Livro não encontrado"
      }
      throw new Error('Erro inesperado ao criar avaliação');
    }
  }

  async calcularMediaNotas(livroId: string): Promise<number> {
    try {
      return await this.avaliacaoDAO.calcularMedia(livroId);
    } catch (error: unknown) {
      throw new Error('Erro ao calcular média de notas');
    }
  }

  async listarAvaliacoesPorLivro(livroId: string): Promise<Avaliacao[]> {
    try {
      return await this.avaliacaoDAO.listarPorLivro(livroId);
    } catch (error: unknown) {
      throw new Error('Erro ao listar avaliações do livro');
    }
  }
}
