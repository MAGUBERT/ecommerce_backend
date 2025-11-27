import { Product } from "src/cases/products/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity('order-item')
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order)
    order: Order;

    @ManyToOne(() => Product, { eager: true, nullable: false })
    product: Product;

    @Column({ nullable: false })
    quantity: number;

    @Column('decimal', { nullable: false, precision: 10, scale: 2 })
    value: number;
}