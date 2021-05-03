import { Exclude } from 'class-transformer';
import {
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

import { User } from '../user/User';

@Entity('quiz')
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({
    name: 'user_id',
  })
  @ManyToOne(() => User)
  user?: User;

  @Column('int', {
    name: 'total',
  })
  total: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
