import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { State } from "./state.entity";

@Entity('city')
export class City {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, length: 60 })
    name: string;

    @Column({ nullable: false, length: 7 })
    ibge: string;

    @ManyToOne(() => State, { eager: true, nullable: false })
    state: State;
}