import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre_rol: string; // 'ADMIN', 'DESPACHADOR', 'VENDEDOR'

    @OneToMany(() => User, (user) => user.rol)
    usuarios: User[];
}