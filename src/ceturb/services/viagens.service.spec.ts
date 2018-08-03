import { Test, TestingModule } from '@nestjs/testing';
import { ViagensService } from './viagens.service';

describe( 'ViagensService', () => {
  let service: ViagensService;

  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ ViagensService ],
    } ).compile();
    service = module.get<ViagensService>( ViagensService );
  } );

  it( 'retorno de viagens deve ser maior do que 0', async () => {
    expect( service.retornar_viagens ).toBeDefined();
    let viagens = [];
    viagens = await service.retornar_viagens();
    expect( viagens.length ).toBeGreaterThanOrEqual( 0 );
  } );

} );
