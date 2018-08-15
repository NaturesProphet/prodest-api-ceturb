import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaLinhas.feature" );
import request from "supertest";
import { LinhasService } from '../src/ceturb/services/__mocks__/linhas.service';
import { INestApplication, HttpModule } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { InformationNotFound } from "../src/ceturb/models/exception/InformationNotFound";
jest.mock( "../src/app.module" );


let linhas = [];

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

  test( "Existem linhas registradas", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber as informações das linhas registrados", () => {
      request( app.getHttpServer() )
        .get( "/linhas" )
        .expect( 200 );
    } );

    when( "eu pesquisar", async () => {
      let requisicao = await request( app.getHttpServer() ).get( "/linhas" );
      linhas = JSON.parse( JSON.stringify( requisicao.body ) );
    } );

    then( "retorna as linhas cadastradas", () => {
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
        throw new InformationNotFound( "nenhum registro encontrado" );
      } );
      let consulta = await request( app.getHttpServer() ).get( "/linhas" );
      expect( consulta.status ).toBe( 204 );
    } );


    when( "eu pesquisar", async () => {
      let requisicao = await request( app.getHttpServer() ).get( "/linhas" );
    } );

    then( "retorna uma mensagem informando que não há registros", async () => {
      LinhasService.prototype.retornar_linhas = jest.fn().mockImplementationOnce( () => {
        throw new InformationNotFound( "nenhum registro encontrado" );
      } );
      let consulta = await request( app.getHttpServer() ).get( "/linhas" );
      expect( consulta.status ).toBe( 204 );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
