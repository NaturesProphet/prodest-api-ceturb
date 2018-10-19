import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Filtro } from "./commom/filter/Filtro";
import { Endpoints } from './commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;
const pacote = require( '../package.json' );

async function bootstrap () {
  const app = await NestFactory.create( AppModule );
  const options = new DocumentBuilder()
    .setTitle( 'Nova api-ceturb' )
    .setDescription( pacote.description )
    .setVersion( pacote.version )
    .addTag( 'api-ceturb' )
    .build();
  const document = SwaggerModule.createDocument( app, options );
  SwaggerModule.setup( `${raiz}/docs`, app, document );
  app.useGlobalFilters( new Filtro() );
  await app.listen( 3000 );
}
bootstrap();