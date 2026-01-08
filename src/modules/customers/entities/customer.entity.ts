import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('clientes') // Nombre exacto en tu BD
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'identificacion_nit', unique: true })
    identificacion_nit: string;

    @Column({ name: 'nombre_cliente' }) // Mapeo exacto
    nombre_cliente: string;

    @Column({ type: 'text' })
    direccion: string;

    @Column({ unique: true })
    telefono_1: string;

    @Column({ nullable: true, unique: true })
    telefono_2: string;

    @Column({ nullable: true })
    frecuencia_entrega: string;

    @Column({ type: 'date', nullable: true })
    proxima_visita_sugerida: Date;

    @Column({ nullable: true })
    vendedor_id: number;

    @CreateDateColumn()
    fecha_creacion: Date;
}