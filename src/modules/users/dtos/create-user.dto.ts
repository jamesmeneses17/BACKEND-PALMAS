import { IsEmail, IsNotEmpty, IsString, MinLength, IsNumber } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    nombre: string;

    @IsEmail({}, { message: 'El correo debe ser un email válido' })
    correo: string;

    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;

    @IsNumber()
    @IsNotEmpty({ message: 'El ID de rol es obligatorio' })
    id_rol: number; // 1 para ADMIN, 2 para DESPACHADOR, 3 para VENDEDOR
}