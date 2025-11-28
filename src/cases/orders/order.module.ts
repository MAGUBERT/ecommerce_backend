import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { OrderService } from "./services/order.service";
import { OrderController } from "./controllers/order.controller";
import { OrderItem } from "./entities/order-item.entity";
import { OrderItemService } from "./services/order-item.service";
import { OrderItemController } from "./controllers/order-item.controller";
import { CustomerModule } from "../customers/customer.module";

@Module({
    imports:[TypeOrmModule.forFeature([Order, OrderItem]), CustomerModule],
    providers: [OrderService, OrderItemService],
    controllers: [OrderController, OrderItemController],
    exports: [OrderService]
})
export class OrderModule {}