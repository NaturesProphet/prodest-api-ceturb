import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaItinerario.feature" );
import request from "supertest";
import { INestApplication, HttpModule, HttpStatus } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { ItinerariosService } from '../src/ceturb/services/itinerarios.service';
import { InformationNotFound } from "../src/ceturb/models/exception/InformationNotFound";
jest.mock( "../src/app.module" );
jest.mock( "../src/ceturb/services/itinerarios.service" );

let itinerarios: any;

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

  test( "Existem itinerários registrados", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber as informações dos itinerários registrados", () => {
      request( app.getHttpServer() )
        .get( "/itinerarios" )
        .expect( 204 );
    } );

    when( "Eu pesquisar os itinerários", async () => {
      let requisicao = await request( app.getHttpServer() ).get( "/itinerarios" );
      itinerarios = JSON.parse( JSON.stringify( requisicao.body ) );
    } );

    then( "retorna os itinerários cadastrados", () => {
      expect( itinerarios.length ).toBeGreaterThan( 0 );
    } );
  } );


  test( "Não existem itinerários registrados", ( {
    given,
    when,
    then
  } ) => {
    let req;
    ItinerariosService.prototype.lista_itinerario = jest.fn()
      .mockImplementationOnce( () => {
        throw new InformationNotFound( "nenhum registro encontrado" );
      } );

    given( "Eu quero saber as informações dos itinerários registrados", async () => {
      ItinerariosService.prototype.lista_itinerario = jest.fn()
        .mockImplementationOnce( () => {
          throw new InformationNotFound( "nenhum registro encontrado" );
        } );
      req = await request( app.getHttpServer() ).get( "/itinerarios" );
      //console.log( req.status )
    } );

    when( "Eu pesquisar os itinerários", async () => {
      let requisicao = await request( app.getHttpServer() ).get( "/itinerarios" );
      itinerarios = JSON.parse( JSON.stringify( requisicao.body ) );
    } );

    then( "retorna uma mensagem informando que não há informações disponíveis", () => {
      expect( itinerarios.length ).toBeGreaterThan( 0 );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
