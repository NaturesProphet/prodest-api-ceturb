import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaItinerario.feature" );
import request from "supertest";
import { INestApplication, HttpModule, HttpStatus } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { InformationNotFound } from "../src/ceturb/models/exception/InformationNotFound";
import { ItinerariosService } from '../src/ceturb/services/__mocks__/itinerarios.service';
// jest.mock( '../src/ceturb/services/itinerarios.service' );
jest.mock( "../src/app.module" );



defineFeature( feature, test => {
  let module: TestingModule;
  let app: INestApplication;
  let itinerarios;
  let resposta;

  beforeAll( async () => {
    module = await Test.createTestingModule( {
      imports: [ AppModule ]
    } ).compile();
    app = module.createNestApplication();
    await app.init();
  } );

  test( "Existem itinerários registrados", ( { given, when, then } ) => {

    given( "Eu quero saber as informações dos itinerários registrados", () => {
      request( app.getHttpServer() )
        .get( "/itinerarios" )
        .expect( 200 );
    } );

    when( "Eu pesquisar os itinerários", async () => {
      let requisicao = await request( app.getHttpServer() ).get( "/itinerarios" );
      itinerarios = JSON.parse( JSON.stringify( requisicao.body ) );
    } );

    then( "retorna os itinerários cadastrados", () => {
      expect( itinerarios.length ).toBeGreaterThan( 0 );
    } );
  } );


  test( "Não existem itinerários registrados", ( { given, when, then } ) => {

    given( "Eu quero saber as informações dos itinerários registrados", async () => {

      ItinerariosService.prototype.lista_itinerario = jest.fn().mockImplementationOnce( () => {
        throw new InformationNotFound( "nenhum registro encontrado" );
      } );
      resposta = await request( app.getHttpServer() ).get( '/itinerarios' );
    } );

    when( "Eu pesquisar os itinerários", async () => {
      let consulta = await request( app.getHttpServer() ).get( "/itinerarios" );
      expect( consulta.status ).toBe( 200 || 204 );
    } );

    then( "retorna uma mensagem informando que não há informações disponíveis", () => {
      console.log( resposta.body )
      expect( resposta.status ).toBe( 204 );
    } );
  } );

  afterAll( async () => {
    await app.close();
  } );

} );

