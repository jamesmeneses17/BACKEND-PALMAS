import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { UsersController } from './users.controllers';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService], // PERMITE QUE AUTH-MODULE LO USE
})
export class UsersModule { }