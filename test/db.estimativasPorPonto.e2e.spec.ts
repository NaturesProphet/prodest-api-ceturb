import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { PontoService } from '../src/transcolDB/services/ponto.service';
import { AppModule } from '../src/app.module';
const feature = loadFeature( "./test/features/db.estimativasPorPonto.feature" );
jest.mock( '../src/transcolDB/services/ponto.service' );
import { Endpoints } from '../src/commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;


//--------------------------------------------------------------------//
//---------------------mocks GLOBAIS obrigatórios --------------------//
//--------------------------------------------------------------------//
jest.mock( '../src/ceturb/ceturb.module' );
jest.mock( "../src/transcolDB/transcolDB.module" );
jest.mock( '../src/app.module' );
jest.mock( '../src/ceturb/services/gtfs.service' );
jest.mock( '../src/ceturb/services/minio.service' );
//--------------------------------------------------------------------//
//---------------------mocks GLOBAIS obrigatórios --------------------//
//--------------------------------------------------------------------//




let resposta: any;
let endpoint: string;
let codigo_ponto: string;

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

  test( "Estimativas encontradas", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de estimativas de viagems registradas para um ponto", async () => {
      codigo_ponto = '123';
      endpoint = `${raiz}/transcoldb/ponto/estimativas/${codigo_ponto}`;
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
    } );

    then( "recebo uma lista de estimativas", () => {
      expect( resposta.status ).toBe( 302 );
    } );
  } );


  test( "Estimativas não encontradas", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de estimativas de viagems registradas para um ponto", async () => {
      codigo_ponto = '0000';
      endpoint = `${raiz}/transcoldb/ponto/estimativas/${codigo_ponto}`;
    } );

    given( "não existem estiamtivas registradas", async () => {
      //simula um banco vazio
      PontoService.prototype.getEstimativas = jest.fn().mockImplementationOnce( () => {
        return [];
      } );
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
      expect( resposta.status ).toBe( 404 );
    } );

    then( "recebo uma mensagem de erro", () => {
      expect( resposta.text ).toBe( "Nenhuma estimativa encontrada na busca" );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
