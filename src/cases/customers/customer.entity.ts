import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "../cities/entities/city.entity";

// Customer entity with optional city
@Entity('customer')
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, length: 60 })
    name: string;

    @Column({ length: 250, nullable: true })
    address: string;

    @Column({ length: 10, nullable: true })
    zipcode: string;

    @ManyToOne(() => City, { eager: true, nullable: true })
    city: City | null;

    @Column({ nullable: true })
    userId: string
}