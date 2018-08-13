import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
const feature = loadFeature( "./test/features/buscaViagens.feature" );
import request from "supertest";

import { INestApplication, HttpModule } from "@nestjs/common";
import { AppModule } from "../src/app.module";
jest.mock( "../src/app.module" );

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
        given( "que a API da geocontrol funciona", () => {
            request( app.getHttpServer() )
                .get( "/viagens" )
                .expect( 200 );
        } );

        when( "eu pesquisar", async () => {
            let requisicao = await request( app.getHttpServer() ).get( "/viagens" );
            linhas = JSON.parse( JSON.stringify( requisicao.body ) );
        } );

        then( "retorna as viagens cadastradas", () => {
            expect( linhas.length ).toBeGreaterThan( 0 );
        } );
    } );

    afterAll( async () => {
        await app.close();
    } );


} );
