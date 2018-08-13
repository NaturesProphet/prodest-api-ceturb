import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaHorarioObs.feature" );
import request from "supertest";

import { INestApplication, HttpModule } from "@nestjs/common";
import { AppModule } from "../src/app.module";
jest.mock( "../src/app.module" );

let horariosObs: any;

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

    test( "Existem observações de horários de linhas registradas", ( {
        given,
        when,
        then
    } ) => {
        
    given( "que a API da geoControl funciona", () => {
      request( app.getHttpServer() )
        .get( "/horarios" )
        .expect( 200 );
    } );

    when( "eu pesquisar as observações do horário de uma linha", async () => {
      let linha = '500';
      let requisicao = await request( app.getHttpServer() ).get( "/horarios/"+linha);
      horariosObs = JSON.parse( JSON.stringify( requisicao.body ) );
    } );

    then( "retornará as observações do horário cadastradas daquela linha", () => {
      expect( horariosObs.length ).toBeGreaterThan( 0 );
    } );
  } );

  afterAll( async () => {
    await app.close();
  } );

} );
