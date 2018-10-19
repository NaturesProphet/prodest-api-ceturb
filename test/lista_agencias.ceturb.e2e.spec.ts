import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { AgenciasService } from "../src/ceturb/services/agencia.ceturb.service";
import { InformationNotFound } from "../src/ceturb/models/exception/InformationNotFound";
import { Endpoints } from '../src/commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;
const feature = loadFeature( "./test/features/buscaAgencia.feature" );

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




let agencias: any;
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

  test( "Existem agencias registradas", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber as informações das agencias públicas de transporte", async () => {
      let resposta = await request( app.getHttpServer() ).get( `${raiz}/agencias` );
      expect( resposta.status ).toBe( 200 );
    } );

    when( "eu pesquisar", async () => {
      let requisicao = await request( app.getHttpServer() ).get( `${raiz}/agencias` );
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
      resposta = await request( app.getHttpServer() ).get( `${raiz}/agencias` );
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
