import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

let appPromise;

export default async function handler(req, res) {
  console.log('Handler iniciado');

  try {
    if (!appPromise) {
      console.log('Criando app NestJS...');
      const app = await NestFactory.create(AppModule);

      app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
      });

      await app.init();
      appPromise = app;
    }

    console.log('App inicializado, processando request...');
    const app = await appPromise;
    app.getHttpAdapter().getInstance()(req, res);
  } catch (err) {
    console.error('Erro no handler:', err);
    res.status(500).json({ error: 'Erro interno no serverless handler' });
  }
}
