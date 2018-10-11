import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { LinhaService } from '../src/transcolDB/services/linha.service';
import { AppModule } from '../src/app.module';
const feature = loadFeature( "./test/features/db.linha.feature" );
jest.mock( '../src/transcolDB/services/linha.service' );

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

  test( "Linhas encontradas", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de linhas", async () => {
      endpoint = '/transcoldb/linha';
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
    } );

    then( "recebo uma lista de linhas", () => {
      expect( resposta.status ).toBe( 302 );
    } );
  } );


  test( "Linhas não encontradas", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de linhas", async () => {
      endpoint = '/transcoldb/linha';
    } );

    given( "O banco de dados está vazio", async () => {
      //simula um banco vazio
      LinhaService.prototype.getLinhas = jest.fn().mockImplementationOnce( () => {
        return [];
      } );
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
      expect( resposta.status ).toBe( 404 );
    } );

    then( "recebo uma mensagem de erro", () => {
      expect( resposta.text ).toBe( "Nenhuma linha encontrada na busca" );
    } );
  } );

  test( "Erro na busca", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de linhas", async () => {
      endpoint = '/transcoldb/linha';
    } );

    given( "algum problema lógico ou de infra ocorreu", async () => {
      //simula o banco offline
      LinhaService.prototype.getLinhas = jest.fn().mockImplementationOnce( () => {
        throw new Error( `Erro ao buscar linhas\nO Banco está conectado e acessível ?` );
      } );
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
      expect( resposta.status ).toBe( 502 );
    } );

    then( "recebo uma mensagem de erro", () => {
      expect( resposta.text ).toBe( `Erro ao buscar linhas\nO Banco está conectado e acessível ?` );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
