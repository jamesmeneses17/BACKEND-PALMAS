import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('usuarios')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ unique: true })
    correo: string;

    @Column()
    password: string;

    @Column({ type: 'timestamp', nullable: true })
    ultima_conexion: Date; // Para saber cuándo entró el vendedor por última vez

    @ManyToOne(() => Role, (role) => role.usuarios)
    @JoinColumn({ name: 'id_rol' })
    rol: Role;
}