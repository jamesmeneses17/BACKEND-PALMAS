import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productos')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'codigo_siigo', unique: true, nullable: true })
    codigoSiigo: string;

    @Column({ name: 'nombre_producto', length: 100 })
    nombre: string;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    precio_unitario: number;
}