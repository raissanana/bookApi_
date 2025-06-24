export interface LivroCreateDTO {
  titulo: string;
  autor: string;
  descricao?: string;
  ano?: number;
}

export interface LivroReadDTO {
  id: string;
  titulo: string;
  autor: string;
  descricao?: string;
  ano?: number;
  mediaNota: number;
}
