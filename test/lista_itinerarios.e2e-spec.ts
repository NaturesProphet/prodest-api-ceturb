import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaItinerario.feature" );
import request from "supertest";

import { INestApplication, HttpModule } from "@nestjs/common";
import { AppModule } from "../src/app.module";
jest.mock( "../src/app.module" );

let itinerarios: any;

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

  test( "Existem itinerários registrados", ( {
    given,
    when,
    then
  } ) => {
    given( "que a API da geoControl funciona", () => {
      request( app.getHttpServer() )
        .get( "/itinerario" )
        .expect( 200 );
    } );

    when( "Eu pesquisar", async () => {
      let requisicao = await request( app.getHttpServer() ).get( "/itinerarios" );
      itinerarios = JSON.parse( JSON.stringify( requisicao.body ) );
    } );

    then( "retorna os itinerários cadastrados", () => {
      expect( itinerarios.length ).toBeGreaterThan( 0 );
    } );
  } );

  afterAll( async () => {
    await app.close();
  } );

} );
