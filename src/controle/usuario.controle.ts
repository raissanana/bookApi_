import { injectable } from 'tsyringe';
import { UsuarioServico } from '../servico/usuario.servico';
import { Request, Response } from 'express';

@injectable()
export class UsuarioControle {
  constructor(private usuarioServico: UsuarioServico) {}

  async cadastrar(req: Request, res: Response) {
    try {
      const { nome, email, senha } = req.body;
      const usuario = await this.usuarioServico.cadastrar(nome, email, senha);
      res.status(201).json(usuario);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const token = await this.usuarioServico.login(email, senha);
      res.json({ token });
    } catch (error: any) {
      res.status(401).json({ erro: error.message });
    }
  }
}
    