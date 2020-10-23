import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'role' })
export class Role {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
}