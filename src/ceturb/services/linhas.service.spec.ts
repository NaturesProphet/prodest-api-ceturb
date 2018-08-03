import { Test, TestingModule } from '@nestjs/testing';
import { LinhasService } from './linhas.service';
import { Linha } from '../models/linhas.model.Dto';
import { HttpService } from '@nestjs/common';

describe( 'LinhasService', () => {
  let service: LinhasService;

  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ HttpService, LinhasService ],
    } ).compile();
    service = module.get<LinhasService>( LinhasService );
  } );

  it( 'O retorno de linhas deve ser maior do que 0', async () => {
    expect( await service.retornar_linhas() ).toBeDefined();
    let linhas = [];
    linhas = await service.retornar_linhas();
    expect( linhas.length ).toBeGreaterThanOrEqual( 0 );
  } );
} );

