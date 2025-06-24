import { AvaliacaoControle } from '../controle/avaliacao.controle';
import { AvaliacaoDAO } from '../dao/avaliacao.dao';
import { AvaliacaoServico } from '../servico/avaliacao.servico';
import { Api } from './api';

export class AvaliacaoApi {
  readonly avaliacaoControle: AvaliacaoControle;

  private constructor(readonly api: Api) {
    this.avaliacaoControle = new AvaliacaoControle(new AvaliacaoServico(new AvaliacaoDAO()));
  }

  public static build(api: Api): void {
    const instancia = new AvaliacaoApi(api);
    instancia.addRotas();
  }

  public addRotas(): void {
    this.api.addRota('/avaliacoes', 'POST', this.avaliacaoControle.criar.bind(this.avaliacaoControle));
    this.api.addRota('/avaliacoes/:livroId', 'GET', this.avaliacaoControle.listarPorLivro.bind(this.avaliacaoControle));
  }
}
