import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaHorario.feature" );
import request from "supertest";

import { INestApplication, HttpModule, HttpStatus } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { HorariosService } from "../src/ceturb/services/horario.service";
import { InformationNotFound } from "../src/ceturb/models/exception/InformationNotFound";
jest.mock( "../src/app.module" );
jest.mock( '../src/ceturb/services/horario.service' );

let horarios: any;

defineFeature( feature, test => {
  let module: TestingModule;
  let app: INestApplication;
  let linha;

  beforeAll( async () => {
    module = await Test.createTestingModule( {
      imports: [ HttpModule, AppModule ]
    } ).compile();
    app = module.createNestApplication();
    await app.init();
  } );




  test( "Existem horários de linhas registradas", ( {
    given,
    when,
    then
  } ) => {

    given( "Eu quero saber as informações das linhas registradas", () => {
      request( app.getHttpServer() )
        .get( "/horarios" )
        .expect( 200 );
    } );

    when( "eu pesquisar uma linha", async () => {
      linha = '500';
      let requisicao = await request( app.getHttpServer() ).get( "/horarios/" + linha );
      horarios = JSON.parse( JSON.stringify( requisicao.body ) );
    } );

    then( "retornará os horários cadastrados daquela linha", () => {
      expect( horarios.length ).toBeGreaterThan( 0 );
    } );
  } );



  test( "Não existem horários de linhas registradas", ( {
    given,
    when,
    then
  } ) => {

    given( "Eu quero saber as informações das linhas registradas", () => {
      request( app.getHttpServer() )
        .get( "/horarios" )
        .expect( 200 );
    } );

    given( "Não há informações cadastradas", () => {
      request( app.getHttpServer() )
        .get( "/horarios" )
        .expect( 200 );
    } );

    when( "eu pesquisar uma linha", async () => {
      linha = 0
    } );

    then( "recebo uma mensagem informando que não há informações disponíveis", () => {

      request( app.getHttpServer() ).get( `/horarios/${linha}` ).expect(204).end();
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
