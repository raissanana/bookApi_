import { UsuarioControle } from '../controle/usuario.controle';
import { UsuarioDAO } from '../dao/usuario.dao';
import { UsuarioServico } from '../servico/usuario.servico';
import { Api } from './api';

export class UsuarioApi {
  readonly usuarioControle: UsuarioControle;

  private constructor(readonly api: Api) {
    this.usuarioControle = new UsuarioControle(new UsuarioServico(new UsuarioDAO()));
  }

  public static build(api: Api): void {
    const instancia = new UsuarioApi(api);
    instancia.addRotas();
  }

  public addRotas(): void {
    this.api.addRota('/usuarios', 'POST', this.usuarioControle.cadastrar.bind(this.usuarioControle));
    this.api.addRota('/login', 'POST', this.usuarioControle.login.bind(this.usuarioControle));
  }
}
