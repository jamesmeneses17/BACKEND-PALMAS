import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Habilitar CORS (Vital para que el celular del vendedor se conecte)
  app.enableCors();

  // 2. Prefijo global para la API (Opcional, pero recomendado)
  app.setGlobalPrefix('api/v1');

  // 3. Validación global de DTOs (Resuelve tus errores de class-validator)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // 4. Configuración de Swagger (Documentación interactiva)
  const config = new DocumentBuilder()
    .setTitle('Sistema Logística Palmas')
    .setDescription('API para registro de clientes, envases y ventas en tiempo real')
    .setVersion('1.0')
    .addBearerAuth() // Para probar endpoints protegidos con JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 5. Puerto configurado (5001 como usaste antes o variable de entorno)
  const port = process.env.PORT || 5001;
  await app.listen(port);

  console.log(` Servidor corriendo en: http://localhost:${port}/api/v1`);
  console.log(` Swagger docs en: http://localhost:${port}/api/docs`);
}
bootstrap();