export type AvaliacaoProps = {
  id: string;
  livro_id: string;
  usuario_id: string;
  nota: number;
  comentario?: string;
  data: Date;
};

export class Avaliacao {
  private constructor(private readonly props: AvaliacaoProps) {}

  public static build({
    livro_id,
    usuario_id,
    nota,
    comentario,
  }: Omit<AvaliacaoProps, 'id' | 'data'>): Avaliacao {
    return new Avaliacao({
      id: crypto.randomUUID(),
      livro_id,
      usuario_id,
      nota,
      comentario,
      data: new Date(),
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
    return this.props.data;
  }

  public toJSON() {
    return {
      id: this.id,
      livro_id: this.livro_id,
      usuario_id: this.usuario_id,
      nota: this.nota,
      comentario: this.comentario,
      data: this.data,
    };
  }
}
