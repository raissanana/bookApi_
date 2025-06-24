import { pool } from '../util/conexao';
import { Usuario } from '../modelo/usuario';
import { v4 as uuidv4 } from 'uuid';

export class UsuarioDAO {
  async criarUsuario(nome: string, email: string, senha_hash: string): Promise<Usuario> {
    const id = uuidv4();
    await pool.query(
      'INSERT INTO usuarios (id, nome, email, senha_hash) VALUES ($1, $2, $3, $4)',
      [id, nome, email, senha_hash]
    );
    return Usuario.build({ nome, email, senha_hash });
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const res = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if ((res.rowCount ?? 0) === 0) return null;
    return res.rows[0] as Usuario;
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    const res = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    if ((res.rowCount ?? 0) === 0) return null;
    return res.rows[0] as Usuario;
  }
}
