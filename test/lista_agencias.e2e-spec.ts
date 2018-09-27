import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaAgencia.feature" );
import request from "supertest";

import { INestApplication, HttpModule, HttpStatus } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { AgenciasService } from "../src/ceturb/services/agencia.service";
import { InformationNotFound } from "../src/ceturb/models/exception/InformationNotFound";
jest.mock( "../src/app.module" );
//jest.mock( "../src/ceturb/services/agencia.service" );
jest.mock( '../src/ceturb/services/gtfs.service' );

let agencias: any;
let resposta: any;

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
    given( "Eu quero saber as informações das agencias públicas de transporte", async () => {
      let resposta = await request( app.getHttpServer() ).get( "/agencias" );
      expect( resposta.status ).toBe( 200 );
    } );

    when( "eu pesquisar", async () => {
      let requisicao = await request( app.getHttpServer() ).get( "/agencias" );
      agencias = JSON.parse( JSON.stringify( requisicao.body ) );
    } );

    then( "recebo as informações", () => {
      expect( agencias.agency_id ).toBe( 1 );
    } );
  } );


  test( 'Não existem agencias registradas', ( { given, when, then, pending } ) => {
    given( 'Eu quero saber as informações das agencias públicas de transporte', async () => {
      AgenciasService.prototype.listar_agencias = jest.fn()
        .mockImplementationOnce( () => {
          return new InformationNotFound( "Não há registros" );
        } );
      resposta = await request( app.getHttpServer() ).get( "/agencias" );
    } );

    given( 'Não há informações sobre essas', () => {
      expect( resposta.body.status ).toBe( 204 );
    } );


    when( 'eu pesquisar', async () => {
      //pesquisa ja foi executada acima e armazenada em 'resposta'
    } );

    then( 'recebo uma mensagem informando que não há agencias', () => {
      expect( resposta.body.message ).toBe( "Não há registros" );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
