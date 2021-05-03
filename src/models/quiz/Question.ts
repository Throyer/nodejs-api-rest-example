import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { QuestionGroup } from './QuestionGroup';
import { QuestionOption } from './QuestionOption';

@Entity('question')
export class Question {
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

  @JoinColumn({
    name: 'group_id',
  })
  @ManyToOne(() => QuestionGroup)
  group?: QuestionGroup;

  @OneToMany(() => QuestionOption, option => option.question)
  options: QuestionOption[];

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
