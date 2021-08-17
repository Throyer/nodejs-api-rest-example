import { UserDetails } from './UserDetails';

export type CreateUserWithSession = UserDetails & {
  token: string;
  refresh_token: string;
};
