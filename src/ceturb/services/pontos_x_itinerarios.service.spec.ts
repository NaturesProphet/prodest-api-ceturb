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
        let data = [ { "teste": "teste" }, { "teste": "teste" } ];
        return data;
      } );
    let pontosItinerarios = [];
    pontosItinerarios = await service.retornar_pontosItinerarios();
    expect( pontosItinerarios.length ).toBeGreaterThan( 0 );
  } );
} );
