import { Controller, Get, Post, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dtos/create-user.dto';

// 1. IMPORTA TU DTO AQUÍ (ajusta la ruta si es necesario)

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Roles('ADMIN')
    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @Roles('ADMIN', 'DESPACHADOR')
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOneById(id);
    }

    @Roles('ADMIN')
    @Post()
    // 2. CAMBIA 'any' POR 'CreateUserDto'
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
}