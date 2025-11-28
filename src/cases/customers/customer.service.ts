import { Repository } from "typeorm";
import { Customer } from "./customer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer)
    private repository: Repository<Customer>
  ) {}

  findAll(): Promise<Customer[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<Customer | null> {
    return this.repository.findOneBy({id: id});
  }

  findByUserId(userId: string): Promise<Customer | null> {
    return this.repository.findOneBy({ userId: userId });
  }

  save(customer: Customer): Promise<Customer> {
    return this.repository.save(customer);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete({id: id});
  }

  async createMinimal(userId: string, data?: { name?: string; address?: string; zipcode?: string; cityId?: string }): Promise<Customer> {
    const customer = new Customer();
    customer.userId = userId;
    customer.name = data?.name || 'Cliente';
    customer.address = data?.address || '';
    customer.zipcode = data?.zipcode || '';
    
    // If cityId provided, use it; otherwise city will be null (now nullable)
    if (data?.cityId) {
      customer.city = { id: data.cityId } as any;
    } else {
      customer.city = null;
    }
    
    return this.repository.save(customer);
  }
}