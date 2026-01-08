import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    nombre: string;

    @IsString()
    @IsNotEmpty({ message: 'La dirección es obligatoria' })
    direccion: string;

    @IsString()
    @IsNotEmpty({ message: 'El teléfono es obligatorio' })
    telefono: string;

    @IsOptional()
    @IsString()
    frecuencia?: string;

    @IsOptional()
    @IsNumber()
    vendedor_id?: number;
}