import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { SalesService } from './sales.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateSaleDto } from './dtos/create-sale.dto';

@ApiTags('Ventas')
@ApiBearerAuth()
@Controller('sales')
export class SalesController {
    constructor(private readonly salesService: SalesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Registrar un nuevo cliente y su venta inicial' })
    async create(@Body() createSaleDto: CreateSaleDto, @Request() req) {
        // El ID del usuario viene del JWT (JwtStrategy devuelve { userId: ... })
        const vendedorId = req.user.userId;
        return this.salesService.createSale(createSaleDto, vendedorId);
    }
}