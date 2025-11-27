import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('state')
export class State {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, length: 60 })
    name: string;

    @Column({ nullable: false, length: 2 })
    ibge: string;

    @Column({ nullable: false, length: 2 })
    acronym: string;
}