import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
const feature = loadFeature( './test/features/pontos_x_itinerarios.feature' );
import request from 'supertest';

import { INestApplication, HttpModule } from '@nestjs/common';
import { AppModule } from '../src/app.module';
jest.mock( "../src/app.module" );

let pontosItinerarios: any;

defineFeature( feature, test => {
  let module: TestingModule;
  let app: INestApplication;

  beforeAll( async () => {
    module = await Test.createTestingModule( {
      imports: [ HttpModule, AppModule ],
    } ).compile();
    app = module.createNestApplication();
    await app.init();
  } );

  test( 'Retornar todas as associações entre pontos e itinerários.', ( {
    given,
    when,
    then,
  } ) => {
    given(
      'que existam associações entre pontos e itinerários registrados.',
      () => {
        request( app.getHttpServer() )
          .get( '/v1/pontosItinerarios' )
          .expect( 200 );
      },
    );

    when(
      'o usuário solicitar as informações sobre as associações entre pontos e itinerários.',
      async () => {
        pontosItinerarios = await request( app.getHttpServer() ).get(
          '/v1/pontosItinerarios',
        );
      },
    );

    then(
      'o sistema retorna todas as associações entre pontos e itinerários.',
      () => {
        //expect( pontosItinerarios.lenght ).toBeGreaterThan( 0 );
      },
    );
  } );

  afterAll( async () => {
    await app.close();
  } );


} );
