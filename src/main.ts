import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Configuración de CORS Dinámica usando .env
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

  app.enableCors({
    origin: [frontendUrl, 'http://localhost:5173'], // Permite producción y local
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 2. Prefijo global para la API
  app.setGlobalPrefix('api/v1');

  // 3. Validación global de DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // 4. Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Sistema Logística Palmas')
    .setDescription('API para registro de clientes, envases y ventas en tiempo real')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 5. Puerto configurado mediante variable de entorno
  const port = process.env.PORT || 5001;
  await app.listen(port);

  console.log(`🚀 Servidor corriendo en puerto: ${port}`);
  console.log(`🌐 Frontend permitido: ${frontendUrl}`);
  console.log(`📖 Swagger docs en: /api/docs`);
}
bootstrap();