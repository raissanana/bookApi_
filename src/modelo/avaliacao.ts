export type AvaliacaoProps = {
  id: string;
  livro_id: string;
  usuario_id: string;
  nota: number;
  comentario?: string; 
  criadoEm: Date;
};

export class Avaliacao {
  private constructor(private readonly props: AvaliacaoProps) {}

  public static build({ livro_id, usuario_id, nota, comentario }: Omit<AvaliacaoProps, 'id' | 'data'>) {
    return new Avaliacao({
      id: crypto.randomUUID().toString(),
      livro_id,
      usuario_id,
      nota,
      comentario, // ← aqui
      criadoEm: new Date(),
    });
  }

  public static assemble(props: AvaliacaoProps): Avaliacao {
    return new Avaliacao(props);
  }

  public get id() {
    return this.props.id;
  }

  public get livro_id() {
    return this.props.livro_id;
  }

  public get usuario_id() {
    return this.props.usuario_id;
  }

  public get nota() {
    return this.props.nota;
  }

  public get comentario() {
    return this.props.comentario;
  }

  public get data() {
    return this.props.criadoEm;
  }
}
