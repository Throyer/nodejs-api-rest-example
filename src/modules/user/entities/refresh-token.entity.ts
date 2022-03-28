import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('refresh_token')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'device_code' })
  deviceCode: string;

  @Column({ name: 'available' })
  available: boolean;

  @Column({ name: 'expires_in' })
  expiresIn: Date;

  @JoinColumn({ name: 'user_id' })
  @OneToOne(() => User)
  user: User;

  @Column({ name: 'user_id' })
  userId: string;
}
