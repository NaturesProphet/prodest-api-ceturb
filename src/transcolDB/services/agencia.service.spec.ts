import { Test, TestingModule } from '@nestjs/testing';
import { AgenciaService } from './agencia.service';
jest.mock( './agencia.service' );

describe( 'AgenciaService', () => {
  let service: AgenciaService;


  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ AgenciaService ],
    } ).compile();
    service = module.get<AgenciaService>( AgenciaService );
  } );


  it( 'Espera-se que o serviço devolva um array como resposta, que seja maior que 0',
    async () => {
      let retorno = await service.getAgencias();
      expect( retorno.length ).toBeGreaterThan( 0 );
    } );

  it( 'Espera-se que o serviço devolva um array como resposta, que seja maior que 0',
    async () => {
      let retorno = await service.getContatos();
      expect( retorno.length ).toBeGreaterThan( 0 );
    } );

  it( 'Espera-se que o serviço devolva um array como resposta, que seja maior que 0',
    async () => {
      let retorno = await service.getFeriados();
      expect( retorno.length ).toBeGreaterThan( 0 );
    } );

  it( 'Espera-se que o serviço devolva um array como resposta, que seja maior que 0',
    async () => {
      let retorno = await service.getTarifas();
      expect( retorno.length ).toBeGreaterThan( 0 );
    } );

} );
