import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { LinhasService } from '../src/ceturb/services/linhas.service';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { InformationNotFound } from "../src/ceturb/models/exception/InformationNotFound";
const feature = loadFeature( "./test/features/buscaLinhas.feature" );
jest.mock( '../src/ceturb/services/linhas.service' );

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




let linhas = [];
let resposta: any;

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

  test( "Existem linhas registradas", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber as informações das linhas registrados", async () => {
      resposta = await request( app.getHttpServer() ).get( '/linhas' );
    } );

    when( "eu pesquisar", async () => {
      //busca ja feita acima
    } );

    then( "retorna as linhas cadastradas", () => {
      linhas = JSON.parse( JSON.stringify( resposta.body ) );
      expect( linhas.length ).toBeGreaterThan( 0 );
    } );
  } );


  test( "Não existem linhas registradas", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber as informações das linhas registrados", () => {
    } );

    given( "não há linhas registradas", async () => {
      LinhasService.prototype.retornar_linhas = jest.fn().mockImplementationOnce( () => {
        return new InformationNotFound( "nenhum registro encontrado" );
      } );
      resposta = await request( app.getHttpServer() ).get( "/linhas" );
      expect( resposta.body.status ).toBe( 204 );
    } );


    when( "eu pesquisar", async () => {

    } );

    then( "retorna uma mensagem informando que não há registros", async () => {
      expect( resposta.body.message ).toBe( "nenhum registro encontrado" );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
