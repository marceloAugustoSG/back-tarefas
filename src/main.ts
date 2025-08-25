import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para qualquer origem
  app.enableCors({
    origin: true,       // true permite qualquer domínio
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,  // permite envio de cookies
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0'); // importante para rodar em containers
  console.log(`App rodando na porta ${port}`);
}
bootstrap();