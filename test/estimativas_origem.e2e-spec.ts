import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( './test/features/buscaEstimativas_origem.feature' );
import request from "supertest";

import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
jest.mock( "../src/app.module" );
jest.mock( "../src/ceturb/services/estimativas.service" );
jest.mock( '../src/ceturb/services/gtfs.service' );


let estimativas: any;
let resposta: any;
let ponto_id: number;

defineFeature( feature, test => {
  let module: TestingModule;
  let app: INestApplication;

  beforeAll( async () => {
    module = await Test.createTestingModule( {
      imports: [ AppModule ]
    } ).compile();
    app = module.createNestApplication();
    await app.init();
  } );

  test( "Existem estimativas para o id do ponto informado", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber as estimativas de veiculos em um ponto", async () => {
      ponto_id = 726;
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( `/estimativas/origem/${ponto_id}` );
      expect( resposta.status ).toBe( 200 );
    } );

    then( "recebo uma lista de veiculos que passarão no ponto", () => {
      estimativas = JSON.parse( JSON.stringify( resposta.body ) ).estimativas;
      expect( estimativas.length ).toBeGreaterThan( 0 );
    } );
  } );



  test( "Eu informei um ponto inválido ou inexistente", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber as estimativas de veiculos em um ponto", async () => {
      ponto_id = 0;
    } );

    given( "O ponto que informei não existe ou é inválido", async () => {
      ponto_id = 0;
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( `/estimativas/origem/${ponto_id}` );
      expect( resposta.status ).toBe( 404 );
    } );

    then( "recebo uma mensagem informando que não foram encontradas estimativas", () => {
      expect( resposta.body.message ).toBe( "Estimativas não encontradas" );
    } );
  } );




  afterAll( async () => {
    await app.close();
  } );

} );
