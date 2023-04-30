import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const isDevelopment = process.env.NODE_ENV !== 'production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Kanban API Docs')
    .setDescription('The Kanban API description')
    .addTag('Kanban')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  const config = app.get(ConfigService);
  app.enableCors({
    origin: !isDevelopment ? config.getOrThrow<string>('ALLOWED_ORIGIN') : '*',
  });
  await app.listen(config.get<number>('PORT') ?? 3000);
}
bootstrap();
