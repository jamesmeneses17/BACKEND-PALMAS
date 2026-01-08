import { Injectable, ConflictException } from '@nestjs/common';
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

    async validateUniqueness(identificacion: string, telefono1: string, telefono2?: string) {
        // Validar Identificación
        const existingId = await this.customerRepository.findOne({ where: { identificacion_nit: identificacion } });
        if (existingId) {
            throw new ConflictException('La identificación ya está registrada en el sistema');
        }

        // Validar Teléfono 1 (búsqueda en ambas columnas de teléfono por si acaso)
        const existingTel1 = await this.customerRepository.findOne({
            where: [
                { telefono_1: telefono1 },
                { telefono_2: telefono1 }
            ]
        });
        if (existingTel1) {
            throw new ConflictException(`El teléfono ${telefono1} ya está registrado`);
        }

        // Validar Teléfono 2 (si existe)
        if (telefono2) {
            const existingTel2 = await this.customerRepository.findOne({
                where: [
                    { telefono_1: telefono2 },
                    { telefono_2: telefono2 }
                ]
            });
            if (existingTel2) {
                throw new ConflictException(`El teléfono ${telefono2} ya está registrado`);
            }
        }

        return { message: 'Datos válidos' };
    }

    async findByIdentificacion(identificacion: string) {
        return await this.customerRepository.findOne({ where: { identificacion_nit: identificacion } });
    }

    async findByTelefono(telefono: string) {
        return await this.customerRepository.findOne({
            where: [
                { telefono_1: telefono },
                { telefono_2: telefono }
            ]
        });
    }
}