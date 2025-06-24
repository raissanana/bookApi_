import { UsuarioControle } from '../controle/usuario.controle';
import { UsuarioDAO } from '../dao/usuario.dao';
import { UsuarioServico } from '../servico/usuario.servico';
import { Api } from './api';

export class UsuarioApi {
  readonly usuarioControle: UsuarioControle;

  private constructor(readonly api: Api) {
    const usuarioDAO = new UsuarioDAO();
    const usuarioServico = new UsuarioServico(usuarioDAO);
    this.usuarioControle = new UsuarioControle(usuarioServico);
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
