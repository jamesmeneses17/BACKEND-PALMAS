import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { Delivery } from './entities/delivery.entity';
import { CreateSaleDto } from './dtos/create-sale.dto';
@Injectable()
export class SalesService {
    constructor(private dataSource: DataSource) { }

    async createSale(dto: CreateSaleDto, vendedorId: number) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // 1. Calcular fecha próxima visita sugerida
            const proximaDate = new Date();
            proximaDate.setDate(proximaDate.getDate() + parseInt(dto.proxima_visita));

            // 2. Crear/Guardar Cliente con nombres de columna de tu SQL
            const cliente = await queryRunner.manager.save(Customer, {
                identificacion_nit: dto.identificacion,
                nombre_cliente: dto.nombre,
                telefono_1: dto.telefono,
                telefono_2: dto.telefono_2,
                direccion: dto.direccion,
                proxima_visita_sugerida: proximaDate,
                vendedor_id: vendedorId,
            });

            // 3. Crear registros en entregas_iniciales
            const entregas = Object.entries(dto.items)
                .filter(([_, cantidad]) => cantidad > 0)
                .map(([productoId, cantidad]) => {
                    return queryRunner.manager.create(Delivery, {
                        cliente_id: cliente.id,
                        vendedor_id: vendedorId,
                        producto_id: parseInt(productoId),
                        cantidad: cantidad,
                        tipo_pago: 'Contado', // Por defecto según tu SQL
                        observaciones: `Registro rápido desde móvil`
                    });
                });

            if (entregas.length > 0) {
                await queryRunner.manager.save(Delivery, entregas);
            }

            await queryRunner.commitTransaction();
            return { message: 'Venta y cliente registrados con éxito', clienteId: cliente.id };
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}