export type LivroProps = {
  id: string;
  titulo: string;
  autor: string;
  descricao?: string;
  ano?: number;
};

export class Livro {
  private constructor(private readonly props: LivroProps) {}

  public static build({ titulo, autor, descricao, ano }: Omit<LivroProps, 'id'>) {
    return new Livro({
      id: crypto.randomUUID().toString(),
      titulo,
      autor,
      descricao,
      ano,
    });
  }

  public static assemble(props: LivroProps): Livro {
    return new Livro(props);
  }

  public get id() {
    return this.props.id;
  }

  public get titulo() {
    return this.props.titulo;
  }

  public get autor() {
    return this.props.autor;
  }

  public get descricao() {
    return this.props.descricao;
  }

  public get ano() {
    return this.props.ano;
  }
}
