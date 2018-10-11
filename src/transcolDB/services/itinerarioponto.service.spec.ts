import { Test, TestingModule } from '@nestjs/testing';
import { ItinerariopontoService } from './itinerarioponto.service';
jest.mock( './itinerarioponto.service' );

describe( 'ItinerariopontoService', () => {
  let service: ItinerariopontoService;


  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ ItinerariopontoService ],
    } ).compile();
    service = module.get<ItinerariopontoService>( ItinerariopontoService );
  } );


  it( 'Espera-se que o serviço devolva um array como resposta, que seja maior que 0',
    async () => {
      let retorno = await service.getItinerariopontos();
      expect( retorno.length ).toBeGreaterThan( 0 );
    } );

} );
