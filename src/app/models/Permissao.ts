import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Permissao {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nome: string;
    
}