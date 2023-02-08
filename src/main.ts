import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataUserAuth } from './interfaces/userAuth';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      dataUser?: DataUserAuth;
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3004);
}
bootstrap();
