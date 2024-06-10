import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as fs from 'fs';
import * as morgan from 'morgan';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';

const logStreem = fs.createWriteStream('api.log', {
  flags: 'a', // append
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.use(morgan('combined', { stream: logStreem }));
  app.useGlobalInterceptors(new TimeOutInterceptor());

  // Configuracion para las respuestas de validacion
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new UnprocessableEntityException(
          validationErrors.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints).join(', '),
          })),
        );
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
