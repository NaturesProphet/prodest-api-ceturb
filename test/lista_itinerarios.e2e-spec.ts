import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaItinerario.feature" );
import request from "supertest";

import { INestApplication, HttpModule } from "@nestjs/common";
import { AppModule } from "../src/app.module";
jest.mock( "../src/app.module" );

let itinerario: any;

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
      itinerario = await request( app.getHttpServer() ).get( "/itinerario" );
    } );

    then( "retorna os itinerários cadastrados", () => {
      //expect( itinerario.lenght ).toBeGreaterThan( 0 );
    } );
  } );

  afterAll( async () => {
    await app.close();
  } );


} );
