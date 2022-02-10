import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './components/app/app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );

    const config = new DocumentBuilder()
        .setTitle('Tonti health checker')
        .setDescription('Register any url for inspect health of this site')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('', app, document);

    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        forbidUnknownValues: true,
        stopAtFirstError: true,
    }));

    await app.listen(process.env.APP_PORT || 3000, '0.0.0.0');
}

bootstrap();
