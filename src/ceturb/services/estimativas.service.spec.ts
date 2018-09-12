import { Test, TestingModule } from '@nestjs/testing';
import { EstimativasService } from './estimativas.service';
import { OrigemEDestino } from '../models/origemEDestino.Dto';
import { OrigemELinha } from '../models/origemELinha.Dto';
jest.mock( './estimativas.service' );

describe( 'EstimativasService', () => {
  let service: EstimativasService;
  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ EstimativasService ],
    } ).compile();
    service = module.get<EstimativasService>( EstimativasService );
  } );

  it( 'O retorno de estimativas por origem deve ser maior que 0', async () => {
    let consulta = await service.ObterPorOrigem( 1 );
    expect( consulta.estimativas.length ).toBeGreaterThan( 0 );
  } );


  it( 'O retorno de estimativas por origem e destino devem ser maior que 0', async () => {
    let query = new OrigemEDestino();
    query.pontoDeDestinoId = 1;
    query.pontoDeOrigemId = 1;
    let consulta = await service.ObterPorOrigemEDestino( query );
    expect( consulta.estimativas.length ).toBeGreaterThan( 0 );
  } );


  it( 'O retorno de estimativas por origem e Linha devem ser maior que 0', async () => {
    let query = new OrigemELinha();
    query.linhaId = 1;
    query.pontoDeOrigemId = 1;
    let consulta = await service.ObterPorOrigemELinha( query );
    expect( consulta.estimativas.length ).toBeGreaterThan( 0 );
  } );

} );
