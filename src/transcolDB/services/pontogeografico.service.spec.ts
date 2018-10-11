import { Test, TestingModule } from '@nestjs/testing';
import { PontogeograficoService } from './pontogeografico.service';
jest.mock( './pontogeografico.service' );

describe( 'PontoGeograficoService', () => {
  let service: PontogeograficoService;


  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ PontogeograficoService ],
    } ).compile();
    service = module.get<PontogeograficoService>( PontogeograficoService );
  } );


  it( 'Espera-se que o serviço devolva um array como resposta, que seja maior que 0',
    async () => {
      let retorno = await service.getPontogeograficos();
      expect( retorno.length ).toBeGreaterThan( 0 );
    } );

} );
