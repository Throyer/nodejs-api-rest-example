import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Role } from './Role';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity({ name: 'user' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ message: 'Informe um nome.' })
    @Column()
    name: string;

    @IsEmail()
    @Column()
    email: string;

    @IsNotEmpty({ message: 'Informe uma senha.' })
    @Column()
    password: string;

    @ManyToMany(type => Role, { eager: true })
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