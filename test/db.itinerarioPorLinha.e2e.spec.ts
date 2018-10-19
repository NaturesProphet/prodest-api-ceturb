import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { ItinerarioService } from '../src/transcolDB/services/itinerario.service';
import { AppModule } from '../src/app.module';
const feature = loadFeature( "./test/features/db.itinerarioPorLinha.feature" );
jest.mock( '../src/transcolDB/services/itinerario.service' );
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
let cod_linha: string;

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

  test( "Itinerarios encontrados", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de itinerarios para uma linha", async () => {
      cod_linha = '509';
      endpoint = `${raiz}/transcoldb/itinerario/${cod_linha}`;
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
    } );

    then( "recebo a lista de itinerarios desta linha", () => {
      expect( resposta.status ).toBe( 302 );
    } );
  } );


  test( "Itinerarios não encontrados", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de itinerarios para uma linha", async () => {
      cod_linha = '000';
      endpoint = `${raiz}/transcoldb/itinerario/${cod_linha}`;
    } );

    given( "Não há registros", async () => {
      //simula um banco vazio
      ItinerarioService.prototype.getItinerariosByCodigo = jest.fn().mockImplementationOnce( () => {
        return [];
      } );
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
      expect( resposta.status ).toBe( 404 );
    } );

    then( "recebo uma mensagem de erro", () => {
      expect( resposta.text ).toBe( "Nenhum itinerario encontrado na busca" );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
