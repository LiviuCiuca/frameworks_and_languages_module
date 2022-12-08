import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //enables cors
  app.enableCors({
    methods: ['GET','POST','DELETE','OPTIONS']
});

   const bodyParser = require("body-parser");
   app.use(bodyParser.json());
  //sets server to port 8000
  await app.listen(8000);
}
bootstrap();
