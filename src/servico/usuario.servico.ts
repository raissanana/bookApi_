import { UsuarioDAO } from '../dao/usuario.dao';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '../modelo/usuario';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || '123';

export class UsuarioServico {
  constructor(private usuarioDAO: UsuarioDAO) {}

  async cadastrar(nome: string, email: string, senha: string): Promise<Omit<Usuario, 'senha_hash'>> {
    try {
      const existe = await this.usuarioDAO.buscarPorEmail(email);
      if (existe) throw new Error('Email já cadastrado');

      const senha_hash = await bcrypt.hash(senha, SALT_ROUNDS);
      const usuario = await this.usuarioDAO.criarUsuario(nome, email, senha_hash);

      const { senha_hash: _, ...resto } = usuario as any;
      return { id: usuario.id, nome: usuario.nome, email: usuario.email };
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao cadastrar usuário');
    }
  }

  async login(email: string, senha: string): Promise<string> {
    try {
      const usuario = await this.usuarioDAO.buscarPorEmail(email);
      if (!usuario) throw new Error('Usuário ou senha inválidos');

      const valido = await bcrypt.compare(senha, usuario.senha_hash);
      if (!valido) throw new Error('Usuário ou senha inválidos');

      const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome, email: usuario.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      return token;
    } catch (error: any) {
      throw new Error(error.message || 'Erro no login');
    }
  }
}
