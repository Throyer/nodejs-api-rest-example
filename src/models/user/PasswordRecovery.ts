import { IntegerTransformer } from '@transformers/IntegerTransformer';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User';

@Entity('password_recovery')
export class PasswordRecovery {
  @Generated('increment')
  @PrimaryColumn('bigint', {
    name: 'id',
    transformer: IntegerTransformer.getInstance(),
  })
  id: number;

  @Column('varchar', {
    name: 'code',
  })
  code?: string;

  @Column('boolean', {
    name: 'confirmed',
  })
  confirmed = false;

  @Column('boolean', {
    name: 'used',
  })
  used = false;

  @Column('timestamp with time zone', {
    name: 'expires_in',
  })
  expiresIn: Date;

  @JoinColumn({
    name: 'user_id',
  })
  @ManyToOne(() => User)
  user?: User;
}
