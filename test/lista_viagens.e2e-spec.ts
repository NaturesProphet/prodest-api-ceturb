import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { ViagensService } from '../src/ceturb/services/viagens.service'
import { InformationNotFound } from "../src/ceturb/models/exception/InformationNotFound";
const feature = loadFeature( "./test/features/buscaViagens.feature" );
jest.mock( '../src/ceturb/services/viagens.service' );

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




let viagens = [];
let resposta: any;

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

    test( "Existem viagens registradas", ( { given, when, then } ) => {


        given( "Eu quero saber as informações das viagens cadastradas", async () => {

            ViagensService.prototype.retornar_viagens = jest.fn().mockImplementationOnce( () => {
                let obj1 = { "dataAgendada": 1534170720000, "linhaId": 428, "itinerarioId": 692, "dataChegadaEstimada": 1534172461000, "veiculo": "14133", "acessibilidade": true }
                let obj2 = { "dataAgendada": 1534170720000, "linhaId": 457, "itinerarioId": 600, "dataChegadaEstimada": 1534172492000, "veiculo": "14217", "acessibilidade": true }
                let obj3 = { "dataAgendada": 1534170720000, "linhaId": 457, "itinerarioId": 601, "dataChegadaEstimada": 1534172495000, "veiculo": "14087", "acessibilidade": true }
                return [ obj1, obj2, obj3 ];
            } );
            resposta = await request( app.getHttpServer() ).get( '/viagens' );
        } );



        when( "eu pesquisar viagens", async () => {
            viagens = JSON.parse( JSON.stringify( resposta.body ) );
        } );



        then( "retorna as viagens cadastradas", () => {
            expect( viagens.length ).toBeGreaterThan( 0 );
        } );
    } );







    test( "Não existem viagens registradas", ( { given, when, then } ) => {


        given( "Eu quero saber as informações das viagens cadastradas", async () => {
            ViagensService.prototype.retornar_viagens = jest.fn().mockImplementationOnce( () => {
                return new InformationNotFound( "Não há registros" )
            } );
            resposta = await request( app.getHttpServer() ).get( '/viagens' );
        } );



        given( "Não há registros disponíveis", async () => {
            expect( resposta.body.status ).toBe( 204 );
        } );




        when( "eu pesquisar viagens", async () => {
            //busca ja feita acima
        } );




        then( "retorna uma mensagem informando que não há informações disponíveis", () => {
            viagens = JSON.parse( JSON.stringify( resposta.body ) );
            expect( resposta.body.message ).toBe( "Não há registros" );
        } );
    } );





    afterAll( async () => {
        await app.close();
    } );

} );
