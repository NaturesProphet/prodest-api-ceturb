import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaGtfsAno.feature" );
import request from "supertest";

import { INestApplication, HttpModule, HttpStatus } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { GtfsService } from "../src/ceturb/services/gtfs.service";
import { InformationNotFound } from "../src/ceturb/models/exception/InformationNotFound";
jest.mock( "../src/app.module" );
jest.mock( '../src/ceturb/services/gtfs.service' );

let resposta: any;
let ano: string;
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

  test( "Existem arquivos GTFS registrados de um ano", ( {
    given,
    when,
    then
  } ) => {

    given( "Eu quero saber as informações dos arquivos GTFS criados de um ano específico", async () => {
        request( app.getHttpServer() )
        .get( "/gtfs/2018" )
        .expect( 200 );
    } );

    when( "eu pesquisar", async () => {
        ano = "2018";
        let requisicao = await request( app.getHttpServer() ).get( "/gtfs/" + ano );
        gtfs = requisicao.body
    } );

    then( "recebo as informações", () => {
      expect( gtfs.length ).toBeGreaterThan( 0 );
    } );
  } );

  test( "Não existem arquivos GTFS registrados de um ano", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber as informações dos arquivos GTFS criados de um ano específico", () => {

    } );

    given( "Não há informações sobre esses arquivos", async () => {
        GtfsService.prototype.getAll = jest.fn().mockImplementationOnce( () => {
            return new InformationNotFound( "Não há arquivos registrados nesse ano" );
          } );
          resposta = await request( app.getHttpServer() ).get( '/gtfs/0' );

    } );

    when( "eu pesquisar", async () => {
      //pesquisa ja feita acima
    } );

    then( "recebo uma mensagem informando que não há arquivos", () => {
      expect( resposta.body.message ).toBe( "Não há arquivos registrados nesse ano" );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
