import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { EstimativaService } from '../src/transcolDB/services/estimativa.service';
import { AppModule } from '../src/app.module';
const feature = loadFeature( "./test/features/db.estimativa.feature" );
jest.mock( '../src/transcolDB/services/estimativa.service' );


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
    given( "quero ver a lista de estimativas", async () => {
      endpoint = '/transcoldb/estimativa';
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
    given( "quero ver a lista de estimativas", async () => {
      endpoint = '/transcoldb/estimativa';
    } );

    given( "O banco de dados está vazio", async () => {
      //simula um banco vazio
      EstimativaService.prototype.getEstimativas = jest.fn().mockImplementationOnce( () => {
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

  test( "Erro na busca", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de estimativas", async () => {
      endpoint = '/transcoldb/estimativa';
    } );

    given( "algum problema lógico ou de infra ocorreu", async () => {
      //simula o banco offline
      EstimativaService.prototype.getEstimativas = jest.fn().mockImplementationOnce( () => {
        throw new Error( `Erro ao buscar estimativas\nO Banco está conectado e acessível ?` );
      } );
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
      expect( resposta.status ).toBe( 502 );
    } );

    then( "recebo uma mensagem de erro", () => {
      expect( resposta.text ).toBe( `Erro ao buscar estimativas\nO Banco está conectado e acessível ?` );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
