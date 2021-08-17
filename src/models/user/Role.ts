import { IntegerTransformer } from '@transformers/IntegerTransformer';
import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Generated,
  PrimaryColumn,
} from 'typeorm';

@Entity('role')
export class Role {
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
    name: 'initials',
  })
  initials: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
