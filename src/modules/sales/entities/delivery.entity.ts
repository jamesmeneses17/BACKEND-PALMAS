import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('entregas_iniciales') // Nombre exacto en tu BD
export class Delivery {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cliente_id: number;

    @Column()
    vendedor_id: number;

    @Column()
    producto_id: number;

    @Column()
    cantidad: number;

    @Column({ type: 'enum', enum: ['Contado', 'Crédito'], default: 'Contado' })
    tipo_pago: string;

    @Column({ nullable: true })
    serial_galon: string;

    @Column({ type: 'text', nullable: true })
    observaciones: string;

    @Column({ default: 0 })
    envases_vacios_recogidos: number;

    @CreateDateColumn()
    fecha_entrega: Date;

    // Relaciones para consultas avanzadas
    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'cliente_id' })
    cliente: Customer;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'producto_id' })
    producto: Product;
}