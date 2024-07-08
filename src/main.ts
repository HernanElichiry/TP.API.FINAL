import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true,  forbidNonWhitelisted: true }))

  await app.listen(3000);
}
bootstrap();

/* estás aplicando el ValidationPipe de manera global en tu aplicación NestJS. 
Esto significa que todas las solicitudes HTTP serán automáticamente validadas según las reglas definidas en tus DTOs.

La opción whitelist: true asegura que solo las propiedades definidas en tus DTOs sean aceptadas en las solicitudes. 
Cualquier propiedad adicional será eliminada antes de que se procese la solicitud.
 Esto es útil para evitar que se procesen datos no deseados y mantener la consistencia en tus datos.
 
 forbidNonWhitelisted: true: Esta opción lanzará una excepción si se encuentran propiedades no incluidas en el DTO.*/