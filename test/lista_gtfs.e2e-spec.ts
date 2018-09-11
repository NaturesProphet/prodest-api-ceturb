import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaGtfs.feature" );
import request from "supertest";

import { INestApplication, HttpModule, HttpStatus } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { GtfsService } from "../src/ceturb/services/gtfs.service";
import { InformationNotFound } from "../src/ceturb/models/exception/InformationNotFound";
jest.mock( "../src/app.module" );
jest.mock( '../src/ceturb/services/gtfs.service' );

let resposta: any;
let gtfs = [];

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

  test( "Existem arquivos GTFS registrados", ( {
    given,
    when,
    then
  } ) => {

    given( "Eu quero saber as informações dos arquivos GTFS criados", async () => {
        resposta = await request( app.getHttpServer() ).get( `/gtfs` );
    } );

    when( "eu pesquisar", async () => {
      
    } );

    then( "recebo as informações", () => {
      gtfs = JSON.parse(JSON.stringify(resposta.body));
      expect( gtfs.length ).toBeGreaterThan( 0 );
    } );
  } );

  test( "Não existem arquivos GTFS registrados", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber as informações dos arquivos GTFS criados", () => {
    } );

    given( "Não há informações sobre esses arquivos", async () => {
        GtfsService.prototype.getAll = jest.fn().mockImplementationOnce( () => {
            return new InformationNotFound( "Não há arquivos registrados" );
          } );
          resposta = await request( app.getHttpServer() ).get( '/gtfs' );
          expect( resposta.status ).toBe( 200 );
    } );

    when( "eu pesquisar", async () => {
      //pesquisa ja feita acima
    } );

    then( "recebo uma mensagem informando que não há arquivos", () => {
      expect( resposta.body.message ).toBe( "Não há arquivos registrados" );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
