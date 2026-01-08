import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async login(correo: string, pass: string) {
        const user = await this.usersService.findByEmail(correo);

        // Cambiamos bcrypt.compare por una comparación directa de texto plano
        if (user && pass === user.password) {
            // ACTUALIZACIÓN DE ÚLTIMA CONEXIÓN
            await this.usersService.updateLastConnection(user.id);

            const payload = {
                email: user.correo,
                sub: user.id,
                rol: user.rol?.nombre_rol || 'vendedor'
            };

            return {
                access_token: this.jwtService.sign(payload),
                user: {
                    nombre: user.nombre,
                    rol: user.rol?.nombre_rol || 'vendedor'
                }
            };
        }

        throw new UnauthorizedException('Credenciales inválidas');
    }
}