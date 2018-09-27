import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaGtfsAnoMesDia.feature" );
import request from "supertest";

import { INestApplication, HttpModule, HttpStatus } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { GtfsService } from "../src/ceturb/services/gtfs.service";
import { InformationNotFound } from "../src/ceturb/models/exception/InformationNotFound";
jest.mock( "../src/app.module" );
jest.mock( '../src/ceturb/services/gtfs.service' );

let endpoint: string;
let resposta: any;
let ano: string;
let mes: string;
let dia: string;
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

  test( "Existem arquivos GTFS registrados de um ano, mês e dia", ( {
    given,
    when,
    then
  } ) => {

    given( "Eu quero saber as informações dos arquivos GTFS criados de um ano, mês e dia específico", async () => {
      ano = '2018';
      mes = '10';
      dia = '31';
      endpoint = `/gtfs/${ano}/${mes}/${dia}`;
    } );

    when( "eu pesquisar", async () => {
      ano = "2018";
      mes = "10";
      dia = "31";
      resposta = await request( app.getHttpServer() ).get( endpoint );

    } );

    then( "recebo as informações", () => {
      gtfs = resposta.body
      expect( gtfs.length ).toBeGreaterThan( 0 );
    } );
  } );

  test( "Não existem arquivos GTFS registrados de um ano, mês e dia", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber as informações dos arquivos GTFS criados de um ano, mês e dia específico", async () => {
      ano = "0";
      mes = "0";
      dia = "0";
      endpoint = `/gtfs/${ano}/${mes}/${dia}`;

    } );

    given( "Não há informações sobre esses arquivos", async () => {
      GtfsService.prototype.getByYearMonthDay = jest.fn().mockImplementationOnce( () => {
        return [];
      } );

    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
    } );

    then( "recebo uma mensagem informando que não há arquivos", () => {
      expect( resposta.text ).toBe( "Não há arquivos registrados nesse ano, mês e dia" );
    } );
  } );

  afterAll( async () => {
    await app.close();
  } );

} );
