export interface AuthResponse {
  user: {
    id?: number;
    name: string;
    email: string;
    roles: string[];
  };
  token: string;
}
