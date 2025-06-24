import { LivroControle } from '../controle/livro.controle';
import { LivroDAO } from '../dao/livro.dao';
import { LivroServico } from '../servico/livro.servico';
import { Api } from './api';

export class LivroApi {
  readonly livroControle: LivroControle;

  private constructor(readonly api: Api) {
    this.livroControle = new LivroControle(new LivroServico(new LivroDAO()));
  }

  public static build(api: Api): void {
    const instancia = new LivroApi(api);
    instancia.addRotas();
  }

  public addRotas(): void {
    this.api.addRota('/livros', 'POST', this.livroControle.criar.bind(this.livroControle));
    this.api.addRota('/livros/busca', 'GET', this.livroControle.buscar.bind(this.livroControle));
    this.api.addRota('/livros', 'GET', this.livroControle.listar.bind(this.livroControle));
  }
}
