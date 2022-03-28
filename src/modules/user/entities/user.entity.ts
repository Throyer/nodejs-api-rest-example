import { Id } from 'src/modules/persistence/helpers/id';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity('user')
export class User {
  @Id()
  id: number;

  @Column('varchar', { name: 'name' })
  name: string;

  @Column('varchar', { name: 'active' })
  active: boolean;

  @Column('varchar', { name: 'email' })
  email: string;

  @Column('varchar', { name: 'deleted_email' })
  deletedEmail: string;

  @Column('varchar', { name: 'password' })
  password: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'role_id',
    },
  })
  roles: Role[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
