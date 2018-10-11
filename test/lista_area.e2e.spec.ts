import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { AreaService } from "../src/ceturb/services/area.service";
import { InformationNotFound } from "../src/ceturb/models/exception/InformationNotFound";
const feature = loadFeature( './test/features/buscaArea.feature' );
jest.mock( "../src/ceturb/services/area.service" );

//--------------------------------------------------------------------//
//---------------------mocks GLOBAIS obrigatórios --------------------//
//--------------------------------------------------------------------//
jest.mock( '../src/ceturb/ceturb.module' );
jest.mock( "../src/transcolDB/transcolDB.module" );
jest.mock( '../src/ceturb/services/gtfs.service' );
jest.mock( '../src/ceturb/services/minio.service' );
//--------------------------------------------------------------------//
//---------------------mocks GLOBAIS obrigatórios --------------------//
//--------------------------------------------------------------------//



let lista_de_pontos: any;
let resposta: any;
let area_de_busca: number[];

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

  test( "Existem pontos na area", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber quais são os pontos em uma area do mapa", async () => {
      area_de_busca = [ 1, 2, 3, 4 ];
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( "/area/1/2/3/4" );
      expect( resposta.status ).toBe( 200 );
    } );

    then( "recebo uma lista de ids dos pontos", () => {
      lista_de_pontos = JSON.parse( JSON.stringify( resposta.body ) ).pontosDeParada;
      expect( lista_de_pontos.length ).toBeGreaterThan( 0 );
    } );
  } );


  test( "Não existem pontos na area", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber quais são os pontos em uma area do mapa", async () => {
      area_de_busca = null;

      AreaService.prototype.BuscaPontosPorArea = jest.fn().mockImplementationOnce( () => {
        throw new InformationNotFound( "nenhum registro encontrado" );
      } );
      resposta = await request( app.getHttpServer() ).get( "/area/1/2/3/4" );
    } );

    given( 'Não há pontos na area designada', () => {
      expect( resposta.status ).toBe( 404 );
    } );

    when( "eu pesquisar", async () => {
      //pesqusia ja feita acima
    } );

    then( "recebo uma mensagem informando que não há pontos dentro da area designada", () => {
      expect( resposta.body.message ).toBe( "Pontos não encontrados" );
    } );
  } );



  afterAll( async () => {
    await app.close();
  } );

} );
