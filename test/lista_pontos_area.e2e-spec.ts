import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaArea.feature" );
import request from "supertest";

import { INestApplication, HttpModule, HttpStatus } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { AreaService } from "../src/ceturb/services/area.service"
import { InformationNotFound } from "../src/ceturb/models/exception/InformationNotFound";
jest.mock( "../src/ceturb/services/area.service" );

let agencias: any;
let resposta: any;

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

  // EM CONSTRUÇÃO.....


  /*
    test( "Existem pontos na area", ( {
      given,
      when,
      then
    } ) => {
      given( "Eu quero saber quais são os pontos em uma area do mapa", async () => {
        const options = {
          method: 'POST',
          uri: '',
          body: ,
          json: true
        };
        let resposta = await request( app.getHttpServer() ).post( "/area" );
        expect( resposta.status ).toBe( 200 );
      } );
  
      when( "eu pesquisar", async () => {
        let requisicao = await request( app.getHttpServer() ).get( "/agencias" );
        agencias = JSON.parse( JSON.stringify( requisicao.body ) );
      } );
  
      then( "recebo as informações", () => {
        expect( agencias.agency_id ).toBe( 1 );
      } );
    } );
  
  
  
    afterAll( async () => {
      await app.close();
    } );
  
  */
} );
