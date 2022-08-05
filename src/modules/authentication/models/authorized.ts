export class Authorized {
  id: number;
  roles: string[];

  constructor({ id, roles }: Pick<Authorized, 'id' | 'roles'>) {
    this.id = id;
    this.roles = roles;
  }

  public isMeOrImADM(id: number): boolean {
    return this.roles.some((role) => role === 'ADM') || this.id === id;
  }
}
