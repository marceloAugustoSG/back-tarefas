import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS
  app.enableCors({
    origin: ['http://localhost:5173'], // substitua pela porta do seu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // se precisar enviar cookies
  });

  await app.listen(3000);
}
bootstrap();
