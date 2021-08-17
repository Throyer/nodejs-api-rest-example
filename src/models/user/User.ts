import { IntegerTransformer } from '@transformers/IntegerTransformer';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './Role';

@Entity('user')
export class User {
  @Generated('increment')
  @PrimaryColumn('bigint', {
    name: 'id',
    transformer: IntegerTransformer.getInstance(),
  })
  id: number;

  @Column('varchar', {
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    name: 'email',
  })
  email: string;

  @Exclude()
  @Column('varchar', {
    name: 'deleted_email',
  })
  deletedEmail: string;

  @Exclude()
  @Column('varchar', {
    name: 'password',
  })
  password: string;

  @Column('varchar', {
    name: 'nickname',
  })
  nickname?: string;

  @Column('varchar', {
    name: 'phone',
  })
  phone?: string;

  @Column('varchar', {
    name: 'avatar_url',
  })
  avatarUrl?: string;

  @Column('boolean', {
    name: 'active',
  })
  active = true;

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

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;
}
