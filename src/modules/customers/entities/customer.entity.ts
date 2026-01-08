import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('clientes')
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nombre_cliente', length: 150 })
    nombre: string;

    @Column({ type: 'text' })
    direccion: string;

    @Column({ name: 'telefono_1', length: 20 })
    telefono: string;

    @Column({ name: 'frecuencia_entrega', length: 50, nullable: true })
    frecuencia: string;

    @Column({ type: 'date', nullable: true })
    proxima_visita_sugerida: Date;

    @Column({ nullable: true })
    vendedor_id: number;

    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;
}