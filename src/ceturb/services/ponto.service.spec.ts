import { Test } from "@nestjs/testing";
import { HttpService } from "@nestjs/common";
import { PontoService } from "./ponto.service";
import { async } from "rxjs/internal/scheduler/async";

describe( "Ponto Service", () => {
  let service: PontoService;

  beforeEach( async () => {
    const module = await Test.createTestingModule( {
      providers: [ HttpService, PontoService ]
    } ).compile();

    service = module.get<PontoService>( PontoService );
  } );

  it( '"retornar os pontos ativos"', async () => {
    expect( await service.retornar_pontos() ).toBeDefined();
    let pontos = [];
    pontos = await service.retornar_pontos();
    expect( pontos.length ).toBeGreaterThanOrEqual( 0 ); 
  } );
} );
