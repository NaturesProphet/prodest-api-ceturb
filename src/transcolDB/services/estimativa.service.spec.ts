import { Test, TestingModule } from '@nestjs/testing';
import { EstimativaService } from './estimativa.service';
jest.mock( './estimativa.service' );

describe( 'estimativaService', () => {
  let service: EstimativaService;


  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ EstimativaService ],
    } ).compile();
    service = module.get<EstimativaService>( EstimativaService );
  } );


  it( 'Espera-se que o serviço devolva um array como resposta, que seja maior que 0',
    async () => {
      let retorno = await service.getEstimativas();
      expect( retorno.length ).toBeGreaterThan( 0 );
    } );

} );
