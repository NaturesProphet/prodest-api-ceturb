import { Test, TestingModule } from '@nestjs/testing';
import { ItinerariosService } from './itinerarios.service';

describe( 'LinhasService', () => {
  let service: ItinerariosService;
  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ ItinerariosService ],
    } ).compile();
    service = module.get<ItinerariosService>( ItinerariosService );
  } );
  it( 'O retorno de itinerários deve ser maior do que 0', async () => {
    expect( await service.lista_itinerario() ).toBeDefined();
    let itinerarios = []
    itinerarios = await service.lista_itinerario();
    expect( itinerarios.length).toBeGreaterThanOrEqual(0);
  } );
} );
