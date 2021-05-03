import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('question_group')
export class QuestionGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'title',
  })
  title: string;

  @Column('varchar', {
    name: 'description',
  })
  description?: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
