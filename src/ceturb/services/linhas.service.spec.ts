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
        let obj1 = {
          "id": 716,
          "codigo": 400,
          "descricao": "VILA VELHA / PRAIA SANTA HELENA"
        }

        let obj2 = {
          "id": 552,
          "codigo": 500,
          "descricao": "T. VILA VELHA / T. ITACIBÁ"
        }

        let obj3 = {
          "id": 544,
          "codigo": 501,
          "descricao": "T. JACARAIPE / T. ITAPARICA  "
        }

        return [ obj1, obj2, obj3 ];
      } );
    let linhas = [];
    linhas = await service.retornar_linhas();
    expect( linhas.length ).toBeGreaterThan( 0 );
  } );
} );

