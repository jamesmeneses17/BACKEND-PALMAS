import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './modules/users/users.service';
import { DataSource } from 'typeorm';
import { User } from './modules/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    // Obtenemos el repositorio directamente para usar SQL update o save
    const dataSource = app.get(DataSource);
    const userRepo = dataSource.getRepository(User);

    const email = 'juan@gmail.com';
    const plainPassword = 'Wikipedia29@';

    console.log(`--- FIXING PASSWORD FOR ${email} ---`);

    const user = await userRepo.findOneBy({ correo: email });

    if (user) {
        console.log('Usuario encontrado. Hasheando password...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        user.password = hashedPassword;
        await userRepo.save(user); // Guardamos el usuario con la contraseña encriptada

        console.log('¡Contraseña actualizada correctamente!');
        console.log(`Nuevo Hash: ${hashedPassword}`);
    } else {
        console.error(`Error: No se encontró el usuario con correo ${email}`);
    }

    await app.close();
}
bootstrap();
