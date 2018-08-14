import { Test, TestingModule } from '@nestjs/testing';
import { HorariosService } from './horario.service';
jest.mock( './horario.service' );

describe( 'HorarioService', () => {
  let service: HorariosService;
  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ HorariosService ],
    } ).compile();
    service = module.get<HorariosService>( HorariosService );
  } );

  it( 'O retorno de horários deve ser maior do que 0', async () => {
    HorariosService.prototype.lista_horario = jest
      .fn()
      .mockImplementationOnce( () => {
        let obj1 = {
          "Linha": '0500',
          "Hora_Saida": "05:05",
          "Terminal_Seq": 1,
          "TP_Horario": 1,
          "Descricao_Hora": "DIAS ÚTEIS",
          "Descricao_Linha": "T. VILA VELHA / T. ITACIBÁ VIA 3ª PONTE",
          "Desc_Terminal": "TERMINAL VILA VELHA",
          "Tipo_Orientacao": " ",
          "Dt_Inicio": "21/08/2016"
        }

        let obj2 = {
          "Linha": '0500',
          "Hora_Saida": "05:20",
          "Terminal_Seq": 1,
          "TP_Horario": 1,
          "Descricao_Hora": "DIAS ÚTEIS",
          "Descricao_Linha": "T. VILA VELHA / T. ITACIBÁ VIA 3ª PONTE",
          "Desc_Terminal": "TERMINAL VILA VELHA",
          "Tipo_Orientacao": " ",
          "Dt_Inicio": "21/08/2016"
        }

        let obj3 = {
          "Linha": '0500',
          "Hora_Saida": "05:35",
          "Terminal_Seq": 1,
          "TP_Horario": 1,
          "Descricao_Hora": "DIAS ÚTEIS",
          "Descricao_Linha": "T. VILA VELHA / T. ITACIBÁ VIA 3ª PONTE",
          "Desc_Terminal": "TERMINAL VILA VELHA",
          "Tipo_Orientacao": " ",
          "Dt_Inicio": "21/08/2016"
        }

        return [ obj1, obj2, obj3 ];
      } );

    let horarios = []
    let linha = '500'
    horarios = await service.lista_horario( linha );
    expect( horarios.length ).toBeGreaterThan( 0 );
  } );

  it( 'O retorno de horários deve ser maior do que 0', async () => {
    HorariosService.prototype.lista_horarioObs = jest
      .fn()
      .mockImplementationOnce( () => {
        let data = [ { "teste": "teste" }, { "teste": "teste" }, { "teste": "teste" } ];
        return data;
      } );

    let horariosObs = []
    let linha = '500'
    horariosObs = await service.lista_horarioObs( linha );
    expect( horariosObs.length ).toBeGreaterThan( 0 );
  } );

} );
