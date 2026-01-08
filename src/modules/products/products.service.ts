import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    // Método para que el vendedor vea los productos en su celular
    async findAll() {
        return await this.productRepository.find();
    }

    async findOne(id: number) {
        return await this.productRepository.findOneBy({ id });
    }


    async create(createProductDto: CreateProductDto) {
        const product = this.productRepository.create(createProductDto);
        return await this.productRepository.save(product);
    }

    async update(id: number, updateProductDto: CreateProductDto) {
        await this.productRepository.update(id, updateProductDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        return await this.productRepository.delete(id);
    }
}