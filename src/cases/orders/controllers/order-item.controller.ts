import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { OrderItemService } from "../services/order-item.service";
import { OrderItem } from "../entities/order-item.entity";

@Controller('order-items')
export class OrderItemController {
    constructor (
        private readonly service: OrderItemService
    ) {}

    @Get()
    findAll(): Promise<OrderItem[]> {
        return this.service.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<OrderItem> {
        const found = await this.service.findById(id);
        
        if (!found) {
            throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
        }

        return found;
    }

    @Post()
    create(@Body() orderItem: OrderItem): Promise<OrderItem> {
        return this.service.save(orderItem);
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() orderItem: OrderItem): Promise<OrderItem> {
        const found = await this.service.findById(id);
        
        if (!found) {
            throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
        }

        orderItem.id = id;

        return this.service.save(orderItem);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        const found = await this.service.findById(id);
        
        if (!found) {
            throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
        }

        return this.service.remove(id);
    }
}