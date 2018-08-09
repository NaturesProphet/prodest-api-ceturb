import { Test } from "@nestjs/testing";
import { HttpService } from "@nestjs/common";
import { PontoService } from "./ponto.service";
jest.mock( "./ponto.service" );

describe( "Ponto Service", () => {
  let service: PontoService;

  beforeEach( async () => {
    const module = await Test.createTestingModule( {
      providers: [ HttpService, PontoService ]
    } ).compile();

    service = module.get<PontoService>( PontoService );
  } );

  it( '"retornar os pontos ativos"', async () => {
    PontoService.prototype.retornar_pontos = jest
      .fn()
      .mockImplementationOnce( () => {
        let data = [ { "teste": "teste" }, { "teste": "teste" } ];
        return data;
      } );
    let pontos = [];
    pontos = await service.retornar_pontos();
    expect( pontos.length ).toBeGreaterThan( 0 );
  } );
} );
