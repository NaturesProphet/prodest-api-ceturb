import { Test, TestingModule } from '@nestjs/testing';
import { AgenciasService } from './agencia.service';

describe( 'AgenciasService', () => {
  let service: AgenciasService;

  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ AgenciasService ],
    } ).compile();
    service = module.get<AgenciasService>( AgenciasService );
  } );

  it( 'O retorno de Agencias deve ser maior do que 0', async () => {
    expect( await service.listar_agencias ).toBeDefined();
    let agencias = [];
    agencias = await service.listar_agencias();
    expect( agencias.length ).toBeGreaterThanOrEqual( 0 );
  } );
} );

