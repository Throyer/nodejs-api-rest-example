import { Id } from 'src/modules/persistence/helpers/id';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('role')
export class Role {
  @Id()
  id: number;

  @Column({ name: 'initials' })
  initials: string;

  @Column({ name: 'description' })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
