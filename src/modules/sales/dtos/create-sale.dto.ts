import { IsString, IsObject, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSaleDto {
    @IsNotEmpty() @IsString() identificacion: string;
    @IsNotEmpty() @IsString() nombre: string;
    @IsNotEmpty() @IsString() telefono: string;
    @IsOptional() @IsString() telefono_2?: string; // Opcional
    @IsNotEmpty() @IsString() direccion: string;
    @IsNotEmpty() @IsString() proxima_visita: string; // Recibimos el '3', '5' u '8'

    @IsObject()
    items: Record<string, number>; // Ejemplo: { "18": 1, "19": 0 }
}