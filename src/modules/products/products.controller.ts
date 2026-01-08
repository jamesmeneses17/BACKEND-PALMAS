import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    // CREAR: Para agregar nuevos productos (ej: Paca de 1L)
    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    // LISTAR TODO: Para que el vendedor vea los productos en el celular
    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    // BUSCAR UNO: Por si necesitas ver el detalle de un solo producto
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.findOne(id);
    }

    // ACTUALIZAR: Útil para cambiar precios de botellones sin tocar la BD
    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProductDto: CreateProductDto // Usamos el mismo DTO o uno parcial
    ) {
        return this.productsService.update(id, updateProductDto);
    }

    // ELIMINAR: Para quitar productos que ya no se comercialicen
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.remove(id);
    }
}