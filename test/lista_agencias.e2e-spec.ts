import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaAgencia.feature" );
import request from "supertest";

import { INestApplication, HttpModule } from "@nestjs/common";
import { AppModule } from "../src/app.module";

let Agencia: any;

defineFeature( feature, test => {
  let module: TestingModule;
  let app: INestApplication;

  beforeAll( async () => {
    module = await Test.createTestingModule( {
      imports: [ HttpModule, AppModule ]
    } ).compile();
    app = module.createNestApplication();
    await app.init();
  } );

  test( "Existem agencias registradas", ( {
    given,
    when,
    then
  } ) => {
    given( "que a API da geocontrol funciona", () => {
      request( app.getHttpServer() )
        .get( "/agencia" )
        .expect( 200 );
    } );

    when( "eu pesquisar", async () => {
      Agencia = await request( app.getHttpServer() ).get( "/agencia" );
    } );

    then( "retorna as agencias cadastradas", () => {
      //expect( Agencia.lenght ).toBeGreaterThanOrEqual( 0 );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
