import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products/product.entity";
import { Customer } from "../customers/customer.entity";

@Entity('favorite')
export class Favorite {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer, { eager: true })
    customer: Customer;

    @ManyToOne(() => Product, { eager: true })
    product: Product;

    @Column()
    customerId: string;

    @Column()
    productId: string;
}