type SessionData = {
  userId: number;
  roles: string[];
};

export class Session {
  id: number;
  roles: string[];

  constructor({ userId, roles }: SessionData) {
    this.id = userId;
    this.roles = roles;
  }

  canEditOrView(userId: number): Boolean {
    if (this.id === userId) {
      return true;
    }
    return this.roles.includes('ADM');
  }
}
