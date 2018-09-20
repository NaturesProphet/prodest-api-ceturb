import { Test, TestingModule } from '@nestjs/testing';
import { AreaService } from './area.service';
jest.mock( './area.service' );

describe( 'AreaService', () => {
  let service: AreaService;
  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ AreaService ],
    } ).compile();
    service = module.get<AreaService>( AreaService );
  } );


  it( 'O retorno de pontos de parada deve ser maior do que 0', async () => {
    let envelope = [ 1, 2, 3, 4 ];
    let consulta = await service.BuscaPontosPorArea( envelope );
    expect( consulta.pontosDeParada.length ).toBeGreaterThan( 0 );
  } );


} );
