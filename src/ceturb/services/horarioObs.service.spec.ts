import { Test, TestingModule } from '@nestjs/testing';
import { HorariosObsService } from './horarioObs.service';
jest.mock( './horarioObs.service' );

describe( 'HorarioService', () => {
  let service: HorariosObsService;
  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ HorariosObsService ],
    } ).compile();
    service = module.get<HorariosObsService>( HorariosObsService );
  } );

  it( 'O retorno de horários deve ser maior do que 0', async () => {
    HorariosObsService.prototype.lista_horarioObs = jest
      .fn()
      .mockImplementationOnce( () => {
        let obj1 = {
          "Tipo_Orientacao": "K",
          "Descricao_Orientacao": "PART.SHOP. P.COSTA INDO ATÉ T.GRANDE VIA B.MAR 2ªA5ª,6ª CUMPRI 23:10"
        }
        let obj2 = {
          "Tipo_Orientacao": "S",
          "Descricao_Orientacao": " HORÁRIO VIA SHOPPING VITÓRIA"
        }

        return [ obj1, obj2 ];
      } );

    let horariosObs = []
    let linha = '500'
    horariosObs = await service.lista_horarioObs( linha );
    expect( horariosObs.length ).toBeGreaterThan( 0 );
  } );

} );
