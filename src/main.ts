import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqp://rabbitmq:rabbitmq@localhost:5672',
        ],
        queue: 'demo_a_queue',
        queueOptions: {
          durable: false
        },
      },
    },
  );
  
  await app.startAllMicroservices();

  await app.listen(4000);
}
bootstrap();
