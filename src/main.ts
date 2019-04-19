import * as dotenv from 'dotenv';
if ( process.env.NODE_ENV != 'production' ) {
  dotenv.config();
}

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Filtro } from "./commom/filter/Filtro";
import { apiPort, rootEndPoint } from './commom/configs/endpoints.config';

const pacote = require( '../package.json' );
const fs = require( 'fs' );

async function bootstrap () {
  const app = await NestFactory.create( AppModule );

  const options = new DocumentBuilder()
    .setTitle( 'api-ceturb' )
    .setDescription( pacote.description )
    .setVersion( pacote.version )
    .addTag( 'api-ceturb' )
    .setSchemes( 'https', 'http' )
    .build();
  const document = SwaggerModule.createDocument( app, options );
  fs.writeFileSync( 'swagger.json', JSON.stringify( document ) )
  SwaggerModule.setup( `${rootEndPoint}/docs`, app, document );
  app.useGlobalFilters( new Filtro() );
  app.enableCors();
  await app.listen( apiPort );
}



bootstrap();
