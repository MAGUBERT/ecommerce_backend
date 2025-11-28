import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { Order } from "../entities/order.entity";
import { OrderService } from "../services/order.service";
import { CustomerService } from "../../customers/customer.service";
import { Customer } from "../../customers/customer.entity";
import { OrderItem } from "../entities/order-item.entity";

@Controller('orders')
export class OrderController {
    constructor (
        private readonly service: OrderService,
        private readonly customerService: CustomerService
    ) {}

    @Get()
    findAll(): Promise<Order[]> {
        return this.service.findAll();
    }

    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
        const found = await this.service.findById(id);
        
        if (!found) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        return found;
    }

    @Post()
    async create(@Body() body: any): Promise<Order> {
        // Accept either customerId or userId in the body
        let customer: Customer | null = null;

        if (body.customerId) {
            customer = await this.customerService.findById(body.customerId);
        } else if (body.userId) {
            customer = await this.customerService.findByUserId(body.userId);
            
            // Auto-create customer if not found
            if (!customer) {
                customer = await this.customerService.createMinimal(body.userId, {
                    name: body.name || body.customerName,
                    address: body.address,
                    zipcode: body.zipCode || body.zipcode,
                    cityId: body.cityId
                });
            }
        }

        if (!customer) {
            throw new HttpException('Customer not found and could not be created. Please provide userId or customerId.', HttpStatus.BAD_REQUEST);
        }

        const order = new Order();
        order.customer = customer;
        order.shipping = body.shipping ?? 0;
        order.total = body.total ?? 0;
        order.items = (body.items || []).map((it: any) => {
            const oi = new OrderItem();
            oi.product = { id: it.productId } as any;
            oi.quantity = it.quantity;
            oi.value = it.unitPrice ?? it.value ?? 0;
            return oi;
        });

        return this.service.save(order);
    }

    @Put(':id')
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() order: Order): Promise<Order> {
        const found = await this.service.findById(id);
        
        if (!found) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        order.id = id;

        return this.service.save(order);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        const found = await this.service.findById(id);
        
        if (!found) {
            throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }

        return this.service.remove(id);
    }
}