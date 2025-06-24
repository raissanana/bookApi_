export type UsuarioProps = {
  id: string;
  nome: string;
  email: string;
  senha_hash: string;
};

export class Usuario {
  private constructor(private readonly props: UsuarioProps) {}

  public static build({ nome, email, senha_hash }: Omit<UsuarioProps, 'id'>) {
    return new Usuario({
      id: crypto.randomUUID().toString(),
      nome,
      email,
      senha_hash,
    });
  }

  public static assemble(props: UsuarioProps): Usuario {
    return new Usuario(props);
  }

  public get id() {
    return this.props.id;
  }

  public get nome() {
    return this.props.nome;
  }

  public get email() {
    return this.props.email;
  }

  public get senha_hash() {
    return this.props.senha_hash;
  }
}
