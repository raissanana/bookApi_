import { container } from 'tsyringe';
import { LivroControle } from '../controle/livro.controle';
import { Api } from './api';

export class LivroApi {
  private constructor(
    private readonly api: Api,
    private readonly livroControle: LivroControle
  ) {}

  public static build(api: Api): void {
    const livroControle = container.resolve(LivroControle);
    const instancia = new LivroApi(api, livroControle);
    instancia.addRotas();
  }

  private addRotas(): void {
    this.api.addRota('/livros/busca', 'GET', this.livroControle.buscar.bind(this.livroControle));
    this.api.addRota('/livros', 'POST', this.livroControle.criar.bind(this.livroControle));
    this.api.addRota('/livros/ordenados-por-nota', 'GET', this.livroControle.listarOrdenadosPorNota.bind(this.livroControle));
    this.api.addRota('/livros/:id/media','GET', this.livroControle.calcularMedia.bind(this.livroControle));
    this.api.addRota('/livros','GET', this.livroControle.listarTodos.bind(this.livroControle));
  }
}
