import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaCalendario.feature" );
import request from "supertest";

import { INestApplication, HttpModule, HttpStatus } from "@nestjs/common";
import { CalendarioService } from '../src/ceturb/services/calendario.service';
import { AppModule } from "../src/app.module";
import { InformationNotFound } from "../src/ceturb/models/exception/InformationNotFound";
jest.mock( "../src/app.module" );
jest.mock( '../src/ceturb/services/calendario.service' );

let calendarios: any;
let resposta: any;
let url: string;

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

  test( "Existem registros de calendario", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber quais são os calendaris da semana", async () => {
      url = '/calendario';
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( url );
      calendarios = JSON.parse( JSON.stringify( resposta.body.Calendarios ) );
    } );

    then( "recebo uma lista de calendarios", () => {
      expect( calendarios.length ).toBeGreaterThan( 0 );
    } );
  } );


  test( 'Não existem registros de calendario', ( { given, when, then, pending } ) => {
    given( 'Eu quero saber quais são os calendaris da semana', async () => {
      url = '/calendario';
      CalendarioService.prototype.listar_calendario = jest.fn()
        .mockImplementationOnce( () => {
          return new InformationNotFound( "Não há registros" );
        } );
      resposta = await request( app.getHttpServer() ).get( url );
    } );

    given( 'Não há registros de calendario', () => {
      expect( resposta.body.status ).toBe( 204 );
    } );


    when( 'eu pesquisar', async () => {
      //pesquisa ja foi executada acima e armazenada em 'resposta'
    } );

    then( 'recebo uma mensagem informando que não há registros de calendario', () => {
      expect( resposta.body.message ).toBe( "Não há registros" );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
