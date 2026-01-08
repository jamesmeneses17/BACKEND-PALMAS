import { Controller, Post, Body, Get, UseGuards, Request, Param } from '@nestjs/common';
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

    @UseGuards(JwtAuthGuard)
    @Post('validate')
    async validate(@Body() body: { identificacion: string; telefono: string; telefono_2?: string }) {
        return this.customersService.validateUniqueness(body.identificacion, body.telefono, body.telefono_2);
    }

    @Get()
    async findAll() {
        return this.customersService.findAll();
    }

    @Get('check/:identificacion')
    async checkExisting(@Param('identificacion') iden: string) {
        const cliente = await this.customersService.findByIdentificacion(iden);
        if (cliente) {
            return {
                exists: true,
                cliente: {
                    identificacion_nit: cliente.identificacion_nit,
                    nombre: cliente.nombre_cliente,
                    telefono: cliente.telefono_1,
                    telefono_2: cliente.telefono_2,
                    direccion: cliente.direccion
                }
            };
        }
        return { exists: false };
    }

    @Get('check-phone/:telefono')
    async checkExistingPhone(@Param('telefono') telefono: string) {
        const cliente = await this.customersService.findByTelefono(telefono);
        if (cliente) {
            return {
                exists: true,
                cliente: {
                    identificacion_nit: cliente.identificacion_nit,
                    nombre: cliente.nombre_cliente,
                    telefono: cliente.telefono_1,
                    telefono_2: cliente.telefono_2,
                    direccion: cliente.direccion
                }
            };
        }
        return { exists: false };
    }
}