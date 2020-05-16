import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Permissao } from "./Permissao";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

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