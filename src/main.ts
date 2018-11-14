import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Filtro } from "./commom/filter/Filtro";
import { Endpoints } from './commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;
const pacote = require( '../package.json' );
const ambiente = process.env.NODE_ENV || 'development';
const fs = require( 'fs' );

async function bootstrap () {
  //define o protocolo a ser usado no swagger
  let schema: 'http' | 'https' = 'http';
  if ( ambiente == 'production' ) schema = 'https';

  const app = await NestFactory.create( AppModule );
  const options = new DocumentBuilder()
    .setTitle( 'api-ceturb' )
    .setDescription( pacote.description )
    .setVersion( pacote.version )
    .addTag( 'api-ceturb' )
    .setSchemes( schema )
    .build();
  const document = SwaggerModule.createDocument( app, options );

  // para gerar o swagger.json (copiando a saida do console)
  fs.writeFileSync('swagger.json', JSON.stringify( document ))
  // console.log( JSON.stringify( document ) );

  SwaggerModule.setup( `${raiz}/docs`, app, document );
  app.useGlobalFilters( new Filtro() );
  await app.listen( 3000 );
}
bootstrap();
