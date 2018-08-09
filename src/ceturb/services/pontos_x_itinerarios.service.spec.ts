import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { PontoItinerarioService } from './pontos_x_itinerarios.service';
import { async } from 'rxjs/internal/scheduler/async';

describe( 'Ponto Service', () => {
  let service: PontoItinerarioService;

  beforeEach( async () => {
    const module = await Test.createTestingModule( {
      providers: [ HttpService, PontoItinerarioService ],
    } ).compile();

    service = module.get<PontoItinerarioService>( PontoItinerarioService );
  } );

  it( 'retornar as associações pontos x itinerarios', async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    expect( await service.retornar_pontosItinerarios() ).toBeDefined();
    let pontosItinerarios = [];
    pontosItinerarios = await service.retornar_pontosItinerarios();
    expect( pontosItinerarios.length ).toBeGreaterThan( 0 );
  } );
} );
