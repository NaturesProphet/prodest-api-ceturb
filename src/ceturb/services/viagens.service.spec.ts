import { Test, TestingModule } from '@nestjs/testing';
import { ViagensService } from './viagens.service';
jest.mock( "./viagens.service" );


describe( 'ViagensService', () => {
  let service: ViagensService;

  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ ViagensService ],
    } ).compile();
    service = module.get<ViagensService>( ViagensService );
  } );

  it( 'retorno de viagens deve ser maior do que 0', async () => {
    ViagensService.prototype.retornar_viagens = jest
      .fn()
      .mockImplementationOnce( () => {
        let data = [ { "teste": "teste" }, { "teste": "teste" } ];
        return data;
      } );
    let viagens = [];
    viagens = await service.retornar_viagens();
    expect( viagens.length ).toBeGreaterThan( 0 );
  } );

} );

