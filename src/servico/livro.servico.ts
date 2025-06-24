import { LivroDAO } from '../dao/livro.dao';
import { AvaliacaoDAO } from '../dao/avaliacao.dao';
import { LivroCreateDTO, LivroReadDTO } from '../dto/livro.dto';
import { AvaliacaoCreateDTO } from '../dto/avaliacao.dto';

export class LivroServico {
  private livroDAO: LivroDAO;
  private avaliacaoDAO: AvaliacaoDAO;

  constructor(livroDAO?: LivroDAO, avaliacaoDAO?: AvaliacaoDAO) {
    this.livroDAO = livroDAO ?? new LivroDAO();
    this.avaliacaoDAO = avaliacaoDAO ?? new AvaliacaoDAO();
  }

  async criarLivro(dados: LivroCreateDTO): Promise<LivroReadDTO> {
    try {
      const livro = await this.livroDAO.criarLivro(dados);
      return { id: livro.id, titulo: livro.titulo, autor: livro.autor, descricao: livro.descricao, ano: livro.ano, mediaNota: 0 };

    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Erro ao criar livro');
    }
  }

  async buscarPorTituloOuAutor(busca: string): Promise<LivroReadDTO[]> {
    try {
      const livros = await this.livroDAO.buscarPorTituloOuAutor(busca);
      const livrosComMedia = await Promise.all(
        livros.map(async (livro) => {
          const media = await this.avaliacaoDAO.calcularMedia(livro.id);
          return { ...livro, mediaNota: Number(media) };
        })
      );
      return { id: livro.id, titulo: livro.titulo, autor: livro.autor, descricao: livro.descricao, ano: livro.ano, mediaNota: Number(media) };

    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Erro ao buscar livros');
    }
  }

async listarLivrosOrdenadosPorNota(): Promise<LivroReadDTO[]> {
  try {
    const livros = await this.livroDAO.listarTodos();

    const livrosComMedia = await Promise.all(
      livros.map(async (livro) => {
        const media = await this.avaliacaoDAO.calcularMedia(livro.id);
        return { ...livro, mediaNota: Number(media) };
      })
    );

    // Ordena os livros pela média das notas em ordem decrescente
    livrosComMedia.sort((a, b) => b.mediaNota - a.mediaNota);

    return livrosComMedia;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Erro ao listar livros ordenados por nota');
  }
}
}