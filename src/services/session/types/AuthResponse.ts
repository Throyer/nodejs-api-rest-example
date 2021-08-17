export interface AuthResponse {
  user: {
    id: number;
    name: string;
    nickname?: string;
    avatarUrl?: string;
    phone: string;
    email: string;
    hasSuitability?: boolean;
    roles: string[];
  };
  token: string;
  refresh_token: string;
}
