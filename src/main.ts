import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Remove propriedades que não são esperadas na requisição
      forbidNonWhitelisted: true, // Recusa requisições com dados adicionais não desejados
      transform: true, // transforma o payload recebido na requisição para o tipo esperado
    }),
  ); // validação global automatica

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
