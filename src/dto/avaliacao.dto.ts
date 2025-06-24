export interface AvaliacaoCreateDTO {
  livro_id: string;
  usuario_id: string;
  nota: number;
  comentario?: string;
}
