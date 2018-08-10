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
        let data = [ { "teste": "teste" }, { "teste": "teste" } ];
        return data;
      } );

    let horarios = []
    let linha = '500'
    horarios = await service.lista_horario(linha);
    expect( horarios.length ).toBeGreaterThan( 0 );
  } );

} );
