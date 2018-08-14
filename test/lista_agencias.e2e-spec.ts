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
    given( "Eu quero saber as informações das agencias públicas de transporte", () => {
      request( app.getHttpServer() )
        .get( "/agencias" )
        .expect( 200 );
    } );

    when( "eu pesquisar", async () => {
      let requisicao = await request( app.getHttpServer() ).get( "/agencias" );
      agencias = JSON.parse( JSON.stringify( requisicao.body ) );
    } );

    then( "recebo as informações", () => {
      expect( agencias.length ).toBeGreaterThan( 0 );
    } );
  } );


  test( 'Não existem agencias registradas', ( { given, when, then, pending } ) => {
    given( 'Eu quero saber as informações das agencias públicas de transporte', () => {
      request( app.getHttpServer() )
        .get( "/agencias" )
        .expect( 200 );
    } );

    given( 'Não há informações sobre essas', () => {

    } );


    when( 'eu pesquisar', async () => {

      AgenciasService.prototype.listar_agencias = jest.fn()
        .mockImplementationOnce( () => {
          return [];
        } );

      let requisicao = await request( app.getHttpServer() ).get( "/agencias" );
      agencias = JSON.parse( JSON.stringify( requisicao.body ) );
    } );

    then( 'recebo uma mensagem informando que não há agencias', () => {
      expect( agencias.length ).toBeLessThanOrEqual( 0 );
    } );
  } );



  afterAll( async () => {
    await app.close();
  } );

} );
