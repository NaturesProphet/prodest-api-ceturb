import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaHorario.feature" );
import request from "supertest";

import { INestApplication, HttpModule } from "@nestjs/common";
import { AppModule } from "../src/app.module";
jest.mock( "../src/app.module" );

let horarios: any;

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

  test( "Existem horários de linhas registradas", ( {
    given,
    when,
    then
  } ) => {
    given( "que a API da geoControl funciona", () => {
      request( app.getHttpServer() )
        .get( "/horarios" )
        .expect( 200 );
    } );

    when( "eu pesquisar uma linha", async () => {
      let requisicao = await request( app.getHttpServer() ).get( "/horarios" );
      horarios = JSON.parse( JSON.stringify( requisicao.body ) );
    } );

    then( "retornará os horários cadastradas daquela linha", () => {
      expect( horarios.length ).toBeGreaterThan( 0 );
    } );
  } );

  afterAll( async () => {
    await app.close();
  } );

} );
