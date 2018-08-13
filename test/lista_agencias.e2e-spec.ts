import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaAgencia.feature" );
import request from "supertest";

import { INestApplication, HttpModule } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { AgenciasService } from "../src/ceturb/services/agencia.service";
jest.mock( "../src/app.module" );
jest.mock( "../src/ceturb/services/agencia.service" );
let agencias: any;

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

  test( "Existem agencias registradas", ( {
    given,
    when,
    then
  } ) => {
    given( "que a API da geocontrol funciona", () => {
      request( app.getHttpServer() )
        .get( "/agencias" )
        .expect( 200 );
    } );

    when( "eu pesquisar", async () => {
      let requisicao = await request( app.getHttpServer() ).get( "/agencias" );
      agencias = JSON.parse( JSON.stringify( requisicao.body ) );
    } );

    then( "retorna as agencias cadastradas", () => {
      expect( agencias.length ).toBeGreaterThan( 0 );
    } );
  } );


  test( 'Não existem agencias registradas', ( { given, when, then, pending } ) => {
    given( 'que a API da geocontrol funciona', () => {
      request( app.getHttpServer() )
        .get( "/agencias" )
        .expect( 200 );
    } );

    when( 'eu pesquisar', async () => {

      AgenciasService.prototype.listar_agencias = jest.fn()
        .mockImplementationOnce( () => {
          return [];
        } );

      let requisicao = await request( app.getHttpServer() ).get( "/agencias" );
      agencias = JSON.parse( JSON.stringify( requisicao.body ) );
    } );

    then( 'retorna um array vazio', () => {
      expect( agencias.length ).toBeLessThanOrEqual( 0 );
    } );
  } );



  afterAll( async () => {
    await app.close();
  } );

} );
