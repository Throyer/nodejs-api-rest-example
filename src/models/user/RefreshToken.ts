import { IntegerTransformer } from '@transformers/IntegerTransformer';
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User';

@Entity('refresh_token')
export class RefreshToken {
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

  @Column('timestamp with time zone', {
    name: 'expires_in',
  })
  expiresIn: Date;

  @Column('boolean', {
    name: 'available',
  })
  available = false;

  @JoinColumn({
    name: 'user_id',
  })
  @ManyToOne(() => User)
  user?: User;

  @Exclude()
  @Column('bigint', {
    name: 'user_id',
    transformer: IntegerTransformer.getInstance(),
  })
  userId?: number;
}
