import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaItinerario.feature" );
import request from "supertest";
import { INestApplication, HttpModule, HttpStatus } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { InformationNotFound } from "../src/ceturb/models/exception/InformationNotFound";
import { ItinerariosService } from '../src/ceturb/services/itinerarios.service';
jest.mock( '../src/ceturb/services/itinerarios.service' );
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

    given( "Eu quero saber as informações dos itinerários registrados", async () => {
      resposta = await request( app.getHttpServer() ).get( `/itinerarios` );
    } );

    when( "Eu pesquisar os itinerários", async () => {
      //pesquisa ja feita acima
    } );

    then( "retorna os itinerários cadastrados", () => {
      itinerarios = JSON.parse( JSON.stringify( resposta.body ) );
      expect( itinerarios.length ).toBeGreaterThan( 0 );
    } );
  } );


  test( "Não existem itinerários registrados", ( { given, when, then } ) => {

    given( "Eu quero saber as informações dos itinerários registrados", async () => {

      ItinerariosService.prototype.lista_itinerario = jest.fn().mockImplementationOnce( () => {
        return new InformationNotFound( "nenhum registro encontrado" );
      } );
      resposta = await request( app.getHttpServer() ).get( '/itinerarios' );
    } );

    when( "Eu pesquisar os itinerários", async () => {
      //busca ja feita acima
    } );

    then( "retorna uma mensagem informando que não há informações disponíveis", () => {
      expect( resposta.body.message ).toBe( "nenhum registro encontrado" );
    } );
  } );

  afterAll( async () => {
    await app.close();
  } );

} );

