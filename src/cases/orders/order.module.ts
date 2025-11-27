import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { OrderService } from "./services/order.service";
import { OrderController } from "./controllers/order.controller";
import { OrderItem } from "./entities/order-item.entity";
import { OrderItemService } from "./services/order-item.service";
import { OrderItemController } from "./controllers/order-item.controller";

@Module({
    imports:[TypeOrmModule.forFeature([Order, OrderItem])],
    providers: [OrderService, OrderItemService],
    controllers: [OrderController, OrderItemController]
})
export class OrderModule {}