import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) { }

    async create(createCustomerDto: CreateCustomerDto, vendedorId: number) {
        const newCustomer = this.customerRepository.create({
            ...createCustomerDto,
            vendedor_id: vendedorId,
        });
        return await this.customerRepository.save(newCustomer);
    }

    async findAll() {
        return await this.customerRepository.find({ order: { id: 'DESC' } });
    }
}