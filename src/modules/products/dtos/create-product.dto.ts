import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
    @IsString()
    nombre: string;

    @IsNumber()
    @Min(0)
    precio_unitario: number;

    @IsOptional()
    @IsString()
    codigoSiigo?: string;
}