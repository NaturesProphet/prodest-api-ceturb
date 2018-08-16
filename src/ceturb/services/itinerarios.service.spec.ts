import { Test, TestingModule } from '@nestjs/testing';
import { ItinerariosService } from './itinerarios.service';
jest.mock( './itinerarios.service' );

describe( 'LinhasService', () => {
  let service: ItinerariosService;
  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ ItinerariosService ],
    } ).compile();
    service = module.get<ItinerariosService>( ItinerariosService );
  } );

  it( 'O retorno de itinerários deve ser maior do que 0', async () => {
    ItinerariosService.prototype.lista_itinerario = jest
      .fn()
      .mockImplementationOnce( () => {
        let obj1 = {
          "id": 1981,
          "codigo": "400I",
          "bandeira": "PRAIA DE SANTA HELENA",
          "linhaId": 716
        }

        let obj2 = {
          "id": 1982,
          "codigo": "400I_C",
          "bandeira": "PRAIA DE SANTA HELENA",
          "linhaId": 716
        }

        let obj3 = {
          "id": 1984,
          "codigo": "400V",
          "bandeira": "VILA VELHA",
          "linhaId": 716
        }

        return [ obj1, obj2, obj3 ];
      } );

    let itinerarios = []
    itinerarios = await service.lista_itinerario();
    expect( itinerarios.length ).toBeGreaterThan( 0 );
  } );

  it( 'O retorno de um itinerários de uma linha deve ser maior do que 0', async () => {
    ItinerariosService.prototype.lista_itinerario = jest
      .fn()
      .mockImplementationOnce( () => {
        let obj1 = {
          "Linha": "0500",
          "Sentido": "I",
          "Sequencia": 1,
          "Tipo": "D",
          "Desc_Via": "T. VILA VELHA",
          "Descricao_Linha": "T. VILA VELHA / T. ITACIBÁ VIA 3ª PONTE",
          "Mensagem": "Processamento sem Erro",
        }
        return [ obj1 ];
      } );

    let itinerarios = [];
    let linha = 500;
    itinerarios = await service.busca_itinerario( linha );
    expect( itinerarios.length ).toBeGreaterThan( 0 );
  } );

} );
