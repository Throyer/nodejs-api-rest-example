import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Permissao } from "./Permissao";
import { IsEmail, IsNotEmpty } from "class-validator";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ message: "Informe um nome." })
    @Column()
    nome: string;

    @IsEmail()
    @Column()
    email: string;

    @IsNotEmpty({ message: "Informe uma senha."})
    @Column()
    senha: string;

    @ManyToMany(type => Permissao, { eager: true})
    @JoinTable({ 
        name: "usuario_permissao",
        joinColumn: { 
            name: "usuario_id"
        },
        inverseJoinColumn: {
            name: "permissao_id"
        }
    })
    permissoes: Permissao[];

}