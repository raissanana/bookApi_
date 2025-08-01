export type LivroProps = {
  id: string;
  titulo: string;
  autor: string;
  descricao?: string;
  ano?: number;
};

export class Livro {
  private constructor(private readonly props: LivroProps) {}

  public static build({ titulo, autor, descricao, ano }: Omit<LivroProps, 'id'>): Livro {
    const anoAtual = new Date().getFullYear();

    if (ano !== undefined) {
      if (ano <= 0) {
        throw new Error('O ano deve ser maior que zero');
      }

      if (ano > anoAtual) {
        throw new Error('O ano não pode ser maior que o ano atual');
      }
    }

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

  public get id(): string {
    return this.props.id;
  }

  public get titulo(): string {
    return this.props.titulo;
  }

  public get autor(): string {
    return this.props.autor;
  }

  public get descricao(): string | undefined {
    return this.props.descricao;
  }

  public get ano(): number | undefined {
    return this.props.ano;
  }
}
