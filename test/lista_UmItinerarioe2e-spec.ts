import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaUmItinerario.feature" );
import request from "supertest";

import { INestApplication, HttpModule } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { ItinerariosService } from "../src/ceturb/services/itinerarios.service";
import { InformationNotFound } from "../src/ceturb/models/exception/InformationNotFound";
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

  test( "Existem itinerários registrados de uma linha", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber as informações do itinerario de uma linha", () => {
      request( app.getHttpServer() )
        .get( "/itinerarios/500" )
        .expect( 200 );
    } );

    when( "Eu pesquisar uma linha", async () => {
      let linha = '500';
      let requisicao = await request( app.getHttpServer() ).get( "/itinerarios/" + linha );
      itinerarios = JSON.parse( JSON.stringify( requisicao.body ) );
    } );

    then( "retorna o itinerário cadastrado de uma linha", () => {
      expect( itinerarios.length ).toBeGreaterThan( 0 );
    } );
  } );


  test( "Não existem itinerários registrados para a linha", async ( {
    given,
    when,
    then
  } ) => {

    given( "Eu quero saber as informações do itinerario de uma linha", async () => {
      let consulta = await request( app.getHttpServer() ).get( "/itinerarios/0" );
      expect( consulta.body.status ).toBe( 204 );
    } );

    given( "não há registro de itinerários para essa linha", async () => {
    } );

    when( "Eu pesquisar uma linha", async () => {
    } );

    then( "retorna uma mensagem informando que não há registros", async () => {
      let consulta = await request( app.getHttpServer() ).get( "/itinerarios/0" );
      expect( consulta.body.message ).toBe( 'Não há registros para essa linha' );
    } );
  } );



  afterAll( async () => {
    await app.close();
  } );

} );
