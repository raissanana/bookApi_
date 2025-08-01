import { LivroCreateDTO, LivroReadDTO } from '../dto/livro.dto';
import { LivroDAO } from '../dao/livro.dao';
import { AvaliacaoDAO } from '../dao/avaliacao.dao';
import { Livro } from '../modelo/livro';
import { injectable } from 'tsyringe';

@injectable()
export class LivroServico {
  constructor(
    private readonly livroDAO: LivroDAO,
    private readonly avaliacaoDAO: AvaliacaoDAO
  ) {}

  async criarLivro(dados: LivroCreateDTO): Promise<Livro> {
  const anoAtual = new Date().getFullYear();

  if (dados.ano && dados.ano > anoAtual) {
    throw new Error('O ano do livro não pode ser maior que o ano atual');
  }

  const livro = Livro.build(dados);
  return await this.livroDAO.criarLivro(livro);
}


  async buscarPorTituloOuAutor(busca: string): Promise<LivroReadDTO[]> {
    const livros = await this.livroDAO.buscarPorTituloOuAutor(busca);

    const livrosComMedia: LivroReadDTO[] = await Promise.all(
      livros.map(async (livro) => {
        const media = await this.avaliacaoDAO.calcularMedia(livro.id);
        return {
          id: livro.id,
          titulo: livro.titulo,
          autor: livro.autor,
          descricao: livro.descricao,
          ano: livro.ano,
          mediaNota: Number(media)
        };
      })
    );

    return livrosComMedia;
  }

  async listarLivrosOrdenadosPorNota(): Promise<LivroReadDTO[]> {
    const livros = await this.livroDAO.listarTodos();

    const livrosComMedia: LivroReadDTO[] = await Promise.all(
      livros.map(async (livro) => {
        const media = await this.avaliacaoDAO.calcularMedia(livro.id);
        return {
          id: livro.id,
          titulo: livro.titulo,
          autor: livro.autor,
          descricao: livro.descricao,
          ano: livro.ano,
          mediaNota: Number(media)
        };
      })
    );

    return livrosComMedia.sort((a, b) => b.mediaNota - a.mediaNota);
  }

  async calcularMediaNotas(livroId: string): Promise<number> {
    const media = await this.avaliacaoDAO.calcularMedia(livroId);
    return Number(media);
  }

  async listarTodos(): Promise<LivroReadDTO[]> {
  const livros = await this.livroDAO.listarTodos();

  const livrosComMedia: LivroReadDTO[] = await Promise.all(
    livros.map(async (livro) => {
      const media = await this.avaliacaoDAO.calcularMedia(livro.id);
      return {
        id: livro.id,
        titulo: livro.titulo,
        autor: livro.autor,
        descricao: livro.descricao,
        ano: livro.ano,
        mediaNota: Number(media)
      };
    })
  );

  return livrosComMedia;
}

}
