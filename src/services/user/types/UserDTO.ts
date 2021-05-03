import { Role, User } from '@models/user';

export interface UserDTO extends Omit<User, 'roles'> {
  roles: Omit<Role, 'name' | 'createdAt' | 'updatedAt'>[];
}
