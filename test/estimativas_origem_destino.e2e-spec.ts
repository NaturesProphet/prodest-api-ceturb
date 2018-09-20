import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( './test/features/buscaEstimativas_origem_destino.feature' );
import request from "supertest";

import { INestApplication, HttpModule, HttpStatus } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { EstimativasService } from "../src/ceturb/services/estimativas.service";
import { InformationNotFound } from "../src/ceturb/models/exception/InformationNotFound";
jest.mock( "../src/app.module" );
jest.mock( "../src/ceturb/services/estimativas.service" );


let estimativas: any;
let resposta: any;
let id_origem: number;
let id_destino: number;

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

  test( "Existem estimativas para o ids dos pontos informados", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber as estimativas de veiculos entre um ponto e outro", async () => {
      id_destino = 727;
      id_origem = 726
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() )
        .get( `/estimativas/origemEDestino/${id_origem}/${id_destino}` );
      expect( resposta.status ).toBe( 200 );
    } );

    then( "recebo uma lista de veiculos que passarão entre os pontos", () => {
      estimativas = JSON.parse( JSON.stringify( resposta.body ) ).estimativas;
      expect( estimativas.length ).toBeGreaterThan( 0 );
    } );
  } );



  test( "Eu informei um ou mais pontos inválidos ou inexistentes", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber as estimativas de veiculos entre um ponto e outro", async () => {
      id_destino = 0;
      id_origem = 0;
    } );

    given( "um ou todos os pontos que informei são inválidos ou não existem", async () => {
      //ja simulado acima
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() )
        .get( `/estimativas/origemEDestino/${id_origem}/${id_destino}` );
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
