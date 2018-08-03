import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaLinhas.feature" );
import request from "supertest";

import { INestApplication, HttpModule } from "@nestjs/common";
import { AppModule } from "../src/app.module";

let linhas: any;

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

  test( "Existem linhas registradas", ( {
    given,
    when,
    then
  } ) => {
    given( "que a API da geocontrol funciona", () => {
      request( app.getHttpServer() )
        .get( "/linhas" )
        .expect( 200 );
    } );

    when( "eu pesquisar", async () => {
      linhas = await request( app.getHttpServer() ).get( "/linhas" );
    } );

    then( "retorna as linhas cadastradas", () => {
      //expect( linhas.lenght ).toBeGreaterThanOrEqual( 0 );
    } );
  } );
} );
