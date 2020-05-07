import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

}