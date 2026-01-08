import { Injectable, ConflictException } from '@nestjs/common';
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

            // 2. BUSCAR O CREAR CLIENTE (Upsert)
            // Lógica de "Find or Create" para evitar duplicados y permitir ventas recurrentes
            let cliente = await queryRunner.manager.findOne(Customer, {
                where: { identificacion_nit: dto.identificacion }
            });

            if (cliente) {
                // Si existe: actualizamos sus datos por si cambiaron de domicilio/teléfono
                cliente.nombre_cliente = dto.nombre;
                cliente.telefono_1 = dto.telefono;
                cliente.telefono_2 = dto.telefono_2 || '';
                cliente.direccion = dto.direccion;
                cliente.proxima_visita_sugerida = proximaDate;
                cliente.vendedor_id = vendedorId;

                await queryRunner.manager.save(cliente);
            } else {
                // Si no existe: lo creamos desde cero
                cliente = queryRunner.manager.create(Customer, {
                    identificacion_nit: dto.identificacion,
                    nombre_cliente: dto.nombre,
                    telefono_1: dto.telefono,
                    telefono_2: dto.telefono_2 || '',
                    direccion: dto.direccion,
                    proxima_visita_sugerida: proximaDate,
                    vendedor_id: vendedorId,
                });
                await queryRunner.manager.save(cliente);
            }

            // 3. Crear registros en entregas_iniciales
            const entregas = Object.entries(dto.items)
                .filter(([_, cantidad]) => cantidad > 0)
                .map(([productoId, cantidad]) => {
                    return queryRunner.manager.create(Delivery, {
                        cliente_id: cliente.id,
                        vendedor_id: vendedorId,
                        producto_id: parseInt(productoId),
                        cantidad: cantidad,
                        tipo_pago: 'Contado',
                        observaciones: `Venta registrada`
                    });
                });

            if (entregas.length > 0) {
                await queryRunner.manager.save(Delivery, entregas);
            }

            await queryRunner.commitTransaction();
            return { message: 'Venta registrada con éxito', clienteId: cliente.id };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            // Ya no es necesario manejar ER_DUP_ENTRY para identificacion/telefono
            console.error('Error transaction sales:', error);
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}