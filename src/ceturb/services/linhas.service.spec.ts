import { Test, TestingModule } from '@nestjs/testing';
import { LinhasService } from './linhas.service';
import { HttpService } from '@nestjs/common';
jest.mock( "./linhas.service" );

describe( 'LinhasService', () => {
  let service: LinhasService;

  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ HttpService, LinhasService ],
    } ).compile();
    service = module.get<LinhasService>( LinhasService );
  } );

  it( 'O retorno de linhas deve ser maior do que 0', async () => {
    LinhasService.prototype.retornar_linhas = jest
      .fn()
      .mockImplementationOnce( () => {
        let data = [ { "teste": "teste" }, { "teste": "teste" } ];
        return data;
      } );
    let linhas = [];
    linhas = await service.retornar_linhas();
    expect( linhas.length ).toBeGreaterThan( 0 );
  } );
} );

