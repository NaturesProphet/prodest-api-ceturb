import { Test, TestingModule } from '@nestjs/testing';
import { ViagemService } from './viagem.service';
jest.mock( './viagem.service' );

describe( 'ViagemService', () => {
  let service: ViagemService;


  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ ViagemService ],
    } ).compile();
    service = module.get<ViagemService>( ViagemService );
  } );


  it( 'Espera-se que o serviço devolva um array como resposta, que seja maior que 0',
    async () => {
      let retorno = await service.getViagems();
      expect( retorno.length ).toBeGreaterThan( 0 );
    } );

} );
