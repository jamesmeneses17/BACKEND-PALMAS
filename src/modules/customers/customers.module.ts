import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer } from './entities/customer.entity';

@Module({
    // Importamos TypeOrmModule para que el Service pueda usar el repositorio de Clientes
    imports: [TypeOrmModule.forFeature([Customer])],
    controllers: [CustomersController],
    providers: [CustomersService],
    // Exportamos el servicio por si lo necesitas en el módulo de Ventas después
    exports: [CustomersService],
})
export class CustomersModule { }