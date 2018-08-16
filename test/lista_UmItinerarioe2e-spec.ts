import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaUmItinerario.feature" );
import request from "supertest";

import { INestApplication, HttpModule } from "@nestjs/common";
import { AppModule } from "../src/app.module";
jest.mock( "../src/app.module" );

let itinerarios: any;
let resposta: any;
let linha: number;

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
    given( "Eu quero saber as informações do itinerario de uma linha", async () => {
      linha = 500;
    } );

    when( "Eu pesquisar uma linha", async () => {
      resposta = await request( app.getHttpServer() ).get( `/itinerarios/${linha}` );
    } );

    then( "retorna o itinerário cadastrado de uma linha", () => {
      itinerarios = JSON.parse( JSON.stringify( resposta.body ) );
      expect( itinerarios.length ).toBeGreaterThan( 0 );
    } );
  } );


  test( "Não existem itinerários registrados para a linha", async ( {
    given,
    when,
    then
  } ) => {

    given( "Eu quero saber as informações do itinerario de uma linha", async () => {
      linha = 0; //propositalmente uma linha invalida para forçar o cenário de erro
    } );

    given( "não há registro de itinerários para essa linha", async () => {
      resposta = await request( app.getHttpServer() ).get( `/itinerarios/${linha}` );
      expect( resposta.body.status || resposta.status ).toBe( 204 );
    } );

    when( "Eu pesquisar uma linha", async () => {
      //pesquisa ja feita acima
    } );

    then( "retorna uma mensagem informando que não há registros", async () => {
      expect( resposta.body.message ).toBe( 'Não há registros para essa linha' );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
