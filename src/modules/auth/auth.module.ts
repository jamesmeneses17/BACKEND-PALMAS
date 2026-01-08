import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        UsersModule, // Para buscar al vendedor en la BD
        PassportModule,
        JwtModule.register({
            secret: 'TU_CLAVE_SECRETA_SUPER_SEGURA', // Debe ser la misma que en la estrategia
            signOptions: { expiresIn: '24h' }, // El token dura todo el turno del vendedor
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService], // Útil si otros módulos necesitan validar tokens
})
export class AuthModule { }