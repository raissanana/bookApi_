import { injectable } from 'tsyringe';
import { LivroServico } from '../servico/livro.servico';
import { Request, Response } from 'express';

@injectable()
export class LivroControle {
  constructor(private readonly livroServico: LivroServico) {}

  async criar(req: Request, res: Response): Promise<void> {
    try {
      const livro = await this.livroServico.criarLivro(req.body);
      res.status(201).json(livro);
    } catch (error: any) {
      res.status(400).json({ erro: error.message || 'Erro ao criar livro' });
    }
  }

async buscar(req: Request, res: Response): Promise<void> {
  try {
    const q = req.query.q;

    if (!q || typeof q !== 'string' || q.trim() === '') {
      res.status(400).json({ erro: 'Parâmetro de busca inválido' });
      return;
    }

    const livros = await this.livroServico.buscarPorTituloOuAutor(q.trim());
    res.json(livros);
  } catch (error: any) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).json({ erro: error.message || 'Erro ao buscar livros' });
  }
}


  async listar(req: Request, res: Response): Promise<void> {
    try {
      const livros = await this.livroServico.listarLivrosOrdenadosPorNota();
      res.json(livros);
    } catch (error: any) {
      res.status(400).json({ erro: error.message || 'Erro ao listar livros' });
    }
  }
}
