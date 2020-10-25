import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable
} from 'typeorm';

import { Role } from './Role';

@Entity({ name: 'user' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToMany(type => Role)
    @JoinTable({
        name: 'user_role',
        joinColumn: {
            name: 'user_id'
        },
        inverseJoinColumn: {
            name: 'role_id'
        }
    })
    roles: Role[];

}