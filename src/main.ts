import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap () {
  const app = await NestFactory.create( AppModule );
  const options = new DocumentBuilder()
    .setTitle( 'Nova api-ceturb' )
    .setDescription( 'API de acesso aos dados do transporte público do estado do Espírito Santo' )
    .setVersion( '1.6' )
    .addTag( 'api-ceturb' )
    .build();
  const document = SwaggerModule.createDocument( app, options );
  SwaggerModule.setup( "docs", app, document );

  await app.listen( 3000 );
}
bootstrap();