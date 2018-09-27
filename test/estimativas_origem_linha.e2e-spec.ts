import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( './test/features/buscaEstimativas_origem_linha.feature' );
import request from "supertest";

import { INestApplication, HttpModule, HttpStatus } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { EstimativasService } from "../src/ceturb/services/estimativas.service";
jest.mock( "../src/app.module" );
jest.mock( "../src/ceturb/services/estimativas.service" );
jest.mock( '../src/ceturb/services/gtfs.service' );


let estimativas: any;
let resposta: any;
let id_origem: number;
let id_linha: number;

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

  test( "Existem estimativas para o ponto e a linha informada", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber as estimativas de uma linha em um ponto", async () => {
      id_linha = 726;
      id_origem = 562;
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() )
        .get( `/estimativas/origemELinha/${id_origem}/${id_linha}` );
      expect( resposta.status ).toBe( 200 );
    } );

    then( "recebo uma lista de veiculos da linha que passarão no ponto", () => {
      estimativas = JSON.parse( JSON.stringify( resposta.body ) ).estimativas;
      expect( estimativas.length ).toBeGreaterThan( 0 );
    } );
  } );



  test( "Eu informei um ponto ou uma linha inválida", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber as estimativas de uma linha em um ponto", async () => {
      id_linha = 0;
      id_origem = 0;
    } );

    given( "o ponto ou a linha que informei são inválidos ou não existem", async () => {
      //ja simulado acima
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() )
        .get( `/estimativas/origemELinha/${id_origem}/${id_linha}` );
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
