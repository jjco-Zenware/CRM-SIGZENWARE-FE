export interface User {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  activo: boolean;
}

export interface LoginRequest {
  correo: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
