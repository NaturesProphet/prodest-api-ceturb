import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaHorario.feature" );
import request from "supertest";

import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
jest.mock( "../src/app.module" );
jest.mock( '../src/ceturb/services/horario.service' );
jest.mock( '../src/ceturb/services/gtfs.service' );

let horarios: any;
let linha: number;
let resposta;

defineFeature( feature, test => {
  let module: TestingModule;
  let app: INestApplication;
  let linha;

  beforeAll( async () => {
    module = await Test.createTestingModule( {
      imports: [ AppModule ]
    } ).compile();
    app = module.createNestApplication();
    await app.init();
  } );



  test( "Existem horários de linhas registradas", ( {
    given,
    when,
    then
  } ) => {

    given( "Eu quero saber as informações dos horarios de uma linha", async () => {
      linha = 500;
    } );

    when( "eu pesquisar uma linha", async () => {
      resposta = await request( app.getHttpServer() ).get( `/horarios/${linha}` );
    } );

    then( "retornará os horários cadastrados daquela linha", () => {
      horarios = JSON.parse( JSON.stringify( resposta.body ) );
      expect( horarios.length ).toBeGreaterThan( 0 );
    } );
  } );



  test( "Não existem horários de linhas registradas", ( {
    given,
    when,
    then
  } ) => {

    given( "Eu quero saber as informações dos horarios de uma linha", () => {
      linha = 0; //propositalmente errado para forçar um cenario de erro
    } );

    given( "Não há informações cadastradas", async () => {
      resposta = await request( app.getHttpServer() ).get( `/horarios/${linha}` );
      expect( resposta.body.status ).toBe( 204 );
    } );

    when( "eu pesquisar uma linha", async () => {
      //pesquisa ja feita acima
    } );

    then( "recebo uma mensagem informando que não há informações disponíveis", () => {
      expect( resposta.body.message ).toBe( "Horarios não encontrados" );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
