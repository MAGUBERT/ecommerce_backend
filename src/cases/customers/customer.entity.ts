import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "../cities/entities/city.entity";

@Entity('customer')
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, length: 60 })
    name: string;

    @Column({ length: 250 })
    address: string;

    @Column({ length: 8 })
    zipcode: string;

    @ManyToOne(() => City, { eager: true })
    city: City;

    @Column({ nullable: true })
    userId: string
}