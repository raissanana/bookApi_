import { injectable } from 'tsyringe';
import { LivroServico } from '../servico/livro.servico';
import { Request, Response } from 'express';

@injectable()
export class LivroControle {
  constructor(private livroServico: LivroServico) {}

  async criar(req: Request, res: Response): Promise<void> {
    try {
      const livro = await this.livroServico.criarLivro(req.body);
      res.status(201).json(livro);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async buscar(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        res.status(400).json({ erro: 'Parâmetro de busca inválido' });
        return;
    }

      const livros = await this.livroServico.buscarPorTituloOuAutor(q);
      res.json(livros);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async listar(req: Request, res: Response): Promise<void> {
    try {
      const livros = await this.livroServico.listarLivrosOrdenadosPorNota();
      res.json(livros);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }
}
