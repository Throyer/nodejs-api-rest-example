import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Question } from './Question';

@Entity('question_option')
export class QuestionOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'title',
  })
  title: string;

  @Column('varchar', {
    name: 'description',
  })
  description: string;

  @Column('int', {
    name: 'score',
  })
  score: number;

  @JoinColumn({
    name: 'question_id',
  })
  @ManyToOne(() => Question)
  question?: Question;

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
}
