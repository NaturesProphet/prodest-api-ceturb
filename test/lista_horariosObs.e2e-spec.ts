import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaHorarioObs.feature" );
import request from "supertest";

import { INestApplication, HttpModule, HttpStatus } from "@nestjs/common";
import { AppModule } from "../src/app.module";

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


  test( "Existem observações de horários de uma linha", ( {
    given,
    when,
    then
  } ) => {

    given( "Eu quero saber as informações adicionais sobre horarios de uma linha", () => {
      request( app.getHttpServer() )
        .get( "/horarios/obs/500" )
        .expect( 200 );
    } );

    when( "eu pesquisar as observações do horário da linha", async () => {
      linha = 500;
      let requisicao = await request( app.getHttpServer() ).get( "/horarios/" + linha );
      horarios = JSON.parse( JSON.stringify( requisicao.body ) );
    } );

    then( "retornará as observações do horário cadastradas daquela linha", () => {
      expect( horarios.length ).toBeGreaterThan( 0 );
    } );
  } );


  test( "Não existem observações de horários de uma linha", ( {
    given,
    when,
    then
  } ) => {

    given( "Eu quero saber as informações adicionais sobre horarios de uma linha", () => {
      request( app.getHttpServer() )
        .get( "/horarios/obs/0" )
        .expect( 204 );
    } );

    when( "eu pesquisar as observações do horário da linha", async () => {
      linha = 500;
      let requisicao = await request( app.getHttpServer() ).get( "/horarios/obs/" + linha );
      horarios = JSON.parse( JSON.stringify( requisicao.body ) );
    } );

    then( "retornará uma mensagem informando que não há registros", async () => {
      let resposta = await request( app.getHttpServer() ).get( "/horarios/obs/0" );
      expect( resposta.status ).toBe( 204 );

    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
