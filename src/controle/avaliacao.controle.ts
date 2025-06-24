import { injectable } from 'tsyringe';
import { AvaliacaoServico } from '../servico/avaliacao.servico';
import { Request, Response } from 'express';

@injectable()
export class AvaliacaoControle {
  constructor(private avaliacaoServico: AvaliacaoServico) {}

  async criar(req: Request, res: Response): Promise<void> {
    try {
      const avaliacao = await this.avaliacaoServico.criarAvaliacao(req.body);
      res.status(201).json(avaliacao.toJSON());
    } catch (error: any) {
      res.status(400).json({ erro: error.message || 'Erro ao criar avaliação' });
    }
  }

  async listarPorLivro(req: Request, res: Response): Promise<void> {
    try {
      const { livroId } = req.params;

      if (!livroId) {
        res.status(400).json({ erro: 'ID do livro é obrigatório' });
        return;
      }

      const avaliacoes = await this.avaliacaoServico.listarAvaliacoesPorLivro(livroId);
      res.json(avaliacoes.map(avaliacao => avaliacao.toJSON()));
    } catch (error: any) {
      res.status(400).json({ erro: error.message || 'Erro ao buscar avaliações' });
    }
  }
}
