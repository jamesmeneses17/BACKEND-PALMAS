import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createCustomerDto: CreateCustomerDto, @Request() req) {
        // Extraemos el ID del vendedor del token JWT para la auditoría
        const vendedorId = req.user.sub;
        return this.customersService.create(createCustomerDto, vendedorId);
    }

    @Get()
    async findAll() {
        return this.customersService.findAll();
    }
}