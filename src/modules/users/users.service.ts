import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    // --- MÉTODOS PARA EL CONTROLADOR ---

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find({
            relations: ['rol'], // Trae el rol de todos los usuarios
        });
    }

    async findOneById(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['rol'],
        });

        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return user;
    }

    // MÉTODO CREATE (Resuelve el error: Property 'create' does not exist)
    async create(createUserDto: CreateUserDto): Promise<User> {
        const { password, id_rol, ...userData } = createUserDto;

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = this.usersRepository.create({
            ...userData,
            password: hashedPassword,
            // Aquí es donde permites "escoger" el rol dinámicamente
            rol: { id: id_rol } as any
        });

        return await this.usersRepository.save(newUser);
    }

    // --- MÉTODOS DE APOYO Y AUTH ---

    // Corrección para TypeORM 0.3+ (Retorna null si no existe)
    async findByEmail(correo: string): Promise<User | null> {
        return await this.usersRepository.findOne({
            where: { correo },
            relations: ['rol'],
        });
    }

    async updateLastConnection(id: number): Promise<void> {
        await this.usersRepository.update(id, {
            // Marca la actividad del vendedor en tiempo real
            ultima_conexion: new Date()
        });
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOneById(id);
        await this.usersRepository.remove(user);
    }
}