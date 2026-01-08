import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Delivery } from './entities/delivery.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Product } from '../products/entities/product.entity';

@Module({
    imports: [
        // Registramos las entidades para que el Service pueda usarlas
        TypeOrmModule.forFeature([Delivery, Customer, Product])
    ],
    controllers: [SalesController],
    providers: [SalesService],
    exports: [SalesService]
})
export class SalesModule { }