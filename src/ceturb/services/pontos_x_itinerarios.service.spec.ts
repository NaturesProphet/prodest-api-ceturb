import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { PontoItinerarioService } from './pontos_x_itinerarios.service';
jest.mock( './pontos_x_itinerarios.service' );

describe( 'Ponto Service', () => {
  let service: PontoItinerarioService;

  beforeEach( async () => {
    const module = await Test.createTestingModule( {
      providers: [ HttpService, PontoItinerarioService ],
    } ).compile();

    service = module.get<PontoItinerarioService>( PontoItinerarioService );
  } );

  it( 'retornar as associações pontos x itinerarios', async () => {
    PontoItinerarioService.prototype.retornar_pontosItinerarios = jest
      .fn()
      .mockImplementationOnce( () => {
        let obj1 = { "itinerarioId": 448, "ordem": 1, "pontoDeParadaId": 3752, "embarque": true, "desembarque": false }

        let obj2 = { "itinerarioId": 448, "ordem": 2, "pontoDeParadaId": 3750, "embarque": true, "desembarque": true }

        let obj3 = { "itinerarioId": 448, "ordem": 3, "pontoDeParadaId": 3753, "embarque": true, "desembarque": true }

        return [ obj1, obj2, obj3 ];
      } );
    let pontosItinerarios = [];
    pontosItinerarios = await service.retornar_pontosItinerarios();
    expect( pontosItinerarios.length ).toBeGreaterThan( 0 );
  } );
} );
