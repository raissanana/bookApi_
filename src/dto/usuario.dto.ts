export interface UsuarioCreateDTO {
  nome: string;
  email: string;
  senha: string;
}

export interface UsuarioLoginDTO {
  email: string;
  senha: string;
}
