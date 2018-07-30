import { NestFactory } from "@nestjs/core";
import { AppModule } from "app.module";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap () {
  const app = await NestFactory.create( AppModule );
  const options = new DocumentBuilder()
    .setTitle( 'api-ceturb' )
    .setDescription( 'implementação de casos de uso na api ca ceturb' )
    .setVersion( '1.0' )
    .addTag( 'nestjs' )
    .build();
  const document = SwaggerModule.createDocument( app, options );
  SwaggerModule.setup( 'api', app, document );




  await app.listen( 3000 );
}
bootstrap();
