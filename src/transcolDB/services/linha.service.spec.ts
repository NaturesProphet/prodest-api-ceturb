import { Test, TestingModule } from '@nestjs/testing';
import { LinhaService } from './linha.service';
jest.mock( './linha.service' );

describe( 'LinhaService', () => {
  let service: LinhaService;


  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ LinhaService ],
    } ).compile();
    service = module.get<LinhaService>( LinhaService );
  } );


  it( 'Espera-se que o serviço devolva um array como resposta, que seja maior que 0',
    async () => {
      let retorno = await service.getLinhas();
      expect( retorno.length ).toBeGreaterThan( 0 );
    } );

} );
