import { injectable } from 'tsyringe';
import { AvaliacaoServico } from '../servico/avaliacao.servico';
import { Request, Response } from 'express';

@injectable()
export class AvaliacaoControle {
  constructor(private avaliacaoServico: AvaliacaoServico) {}

  async criar(req: Request, res: Response) {
    try {
      const avaliacao = await this.avaliacaoServico.criarAvaliacao(req.body);
      res.status(201).json(avaliacao);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async listarPorLivro(req: Request, res: Response) {
    try {
      const { livroId } = req.params;
      const avaliacoes = await this.avaliacaoServico.listarAvaliacoesPorLivro(livroId);
      res.json(avaliacoes);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }
}
