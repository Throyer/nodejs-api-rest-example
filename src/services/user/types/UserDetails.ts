import { User } from '@models/user/User';

export class UserDetails {
  id: number;
  name: string;
  email: string;
  nickname?: string;
  phone?: string;
  avatarUrl?: string;
  hasSuitability?: boolean;
  active: boolean;
  roles: [number, string][];

  constructor({
    id,
    name,
    email,
    nickname,
    phone,
    avatarUrl,
    active,
    roles,
  }: User) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.nickname = nickname;
    this.phone = phone;
    this.avatarUrl = avatarUrl;
    this.active = active;
    this.roles = roles.map(({ id, initials }) => [id, initials]);
  }
}
