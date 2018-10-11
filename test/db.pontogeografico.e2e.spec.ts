import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { PontogeograficoService } from '../src/transcolDB/services/pontogeografico.service';
import { AppModule } from '../src/app.module';
const feature = loadFeature( "./test/features/db.pontogeografico.feature" );
jest.mock( '../src/transcolDB/services/pontogeografico.service' );

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

  test( "Pontos geográficos encontrados", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de pontos geográficos", async () => {
      endpoint = '/transcoldb/pontogeografico';
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
    } );

    then( "recebo uma lista de pontos geográficos", () => {
      expect( resposta.status ).toBe( 302 );
    } );
  } );


  test( "Pontos geográficos não encontrados", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de pontos geográficos", async () => {
      endpoint = '/transcoldb/pontogeografico';
    } );

    given( "O banco de dados está vazio", async () => {
      //simula um banco vazio
      PontogeograficoService.prototype.getPontogeograficos = jest.fn().mockImplementationOnce( () => {
        return [];
      } );
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
      expect( resposta.status ).toBe( 404 );
    } );

    then( "recebo uma mensagem de erro", () => {
      expect( resposta.text ).toBe( "Nenhum ponto geográfico encontrado na busca" );
    } );
  } );

  test( "Erro na busca", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de pontos geográficos", async () => {
      endpoint = '/transcoldb/pontogeografico';
    } );

    given( "algum problema lógico ou de infra ocorreu", async () => {
      //simula o banco offline
      PontogeograficoService.prototype.getPontogeograficos = jest.fn().mockImplementationOnce( () => {
        throw new Error( `Erro ao buscar pontos geográficos\nO Banco está conectado e acessível ?` );
      } );
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
      expect( resposta.status ).toBe( 502 );
    } );

    then( "recebo uma mensagem de erro", () => {
      expect( resposta.text ).toBe( `Erro ao buscar pontos geográficos\nO Banco está conectado e acessível ?` );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
