import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //  //as method implies globally sets endpoints to api --> works, ERROR:double maps the routes, then fails most tests, due to the endpoint?
  //  app.setGlobalPrefix("/api");
  //enables cors
  app.enableCors({
    methods: ['GET','POST','DELETE']
});

  //sets server to port 8000
  await app.listen(8000);
}
bootstrap();
