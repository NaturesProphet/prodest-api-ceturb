import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaViagens.feature" );
import request from "supertest";

import { INestApplication, HttpModule } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { ViagensService } from "../src/ceturb/services/viagens.service";
import { InformationNotFound } from "../src/ceturb/models/exception/InformationNotFound";
jest.mock( "../src/app.module" );
jest.mock( "../src/ceturb/services/viagens.service" );

let linhas: any;

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

    test( "Existem viagens registradas", ( {
        given,
        when,
        then
    } ) => {
        given( "Eu quero saber as informações das viagens cadastradas", () => {
            request( app.getHttpServer() )
                .get( "/viagens" )
                .expect( 200 );
        } );

        when( "eu pesquisar viagens", async () => {
            let requisicao = await request( app.getHttpServer() ).get( "/viagens" );
            linhas = JSON.parse( JSON.stringify( requisicao.body ) );
        } );

        then( "retorna as viagens cadastradas", () => {
            expect( linhas.length ).toBeGreaterThan( 0 );
        } );
    } );


    test( "Não existem viagens registradas", ( {
        given,
        when,
        then
    } ) => {
        given( "Eu quero saber as informações das viagens cadastradas", () => {
            request( app.getHttpServer() )
                .get( "/viagens" )
                .expect( 200 );
        } );

        when( "eu pesquisar viagens", async () => {
            let requisicao = await request( app.getHttpServer() ).get( "/viagens" );
            linhas = JSON.parse( JSON.stringify( requisicao.body ) );
        } );

        then( "retorna uma mensagem informando que não há informações disponíveis", async () => {
            ViagensService.prototype.retornar_viagens = jest.fn()
                .mockImplementationOnce( () => {
                    throw new InformationNotFound( "Não há informações disponíveis" );
                } );
            let requisicao = await request( app.getHttpServer() ).get( "/viagens" );
            console.log( requisicao.status )
        } );
    } );

    afterAll( async () => {
        await app.close();
    } );
} );
