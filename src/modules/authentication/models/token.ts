export interface Token {
  iat: number;
  exp: number;
  sub: string;
  roles: string[];
}
