import {
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { QuestionOption } from './QuestionOption';
import { Quiz } from './Quiz';

@Entity('quiz_result')
export class QuizResult {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({
    name: 'quiz_id',
  })
  @ManyToOne(() => QuizResult)
  quiz?: Quiz;

  @JoinColumn({
    name: 'option_id',
  })
  @ManyToOne(() => QuestionOption)
  option?: QuestionOption;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
