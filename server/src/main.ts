import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: ['GET','POST','DELETE']
});
  await app.listen(8000);
  //as method implies globally sets enpoints to api --> dosen`t work
  app.setGlobalPrefix("api");
  await app.init();
}
bootstrap();
