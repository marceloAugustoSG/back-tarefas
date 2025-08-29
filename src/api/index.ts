import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

let appPromise;

export default async function handler(req, res) {
    if (!appPromise) {
        const app = await NestFactory.create(AppModule);

        app.enableCors({
            origin: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            credentials: true,
        });

        await app.init();
        appPromise = app;
    }

    const app = await appPromise;
    app.getHttpAdapter().getInstance()(req, res);
}