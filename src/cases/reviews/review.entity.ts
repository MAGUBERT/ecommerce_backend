import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Customer } from "../customers/customer.entity";
import { Product } from "../products/product.entity";

@Entity('review')
@Unique(['customer', 'product'])
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    stars: number;

    @ManyToOne(() => Customer, { eager: true })
    customer: Customer;

    @ManyToOne(() => Product, { eager: true })
    product: Product;
}
