import { Test, TestingModule } from '@nestjs/testing';
import { AgenciasService } from './agencia.ceturb.service';
jest.mock( './agencia.ceturb.service' );

describe( 'AgenciasService', () => {
  let service: AgenciasService;

  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ AgenciasService ],
    } ).compile();
    service = module.get<AgenciasService>( AgenciasService );
  } );

  it( 'O retorno de Agencias deve ser maior do que 0', async () => {
    AgenciasService.prototype.listar_agencias = jest
      .fn()
      .mockImplementationOnce( () => {
        return [
          {
            "agency_id": 1,
            "agency_name": "CETURB/ES",
            "agency_timezone": "America/Sao_Paulo",
            "agency_url": "https://ceturb.es.gov.br/",
            "agency_lang": "pt",
            "agency_phone": "+55 27 3232 4500"
          }
        ];
      } );
    let agencias = [];
    agencias = await service.listar_agencias();
    expect( agencias.length ).toBeGreaterThan( 0 );
  } );

} );

