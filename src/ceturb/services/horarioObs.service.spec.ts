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
        let data = [ { "teste": "teste" }, { "teste": "teste" }, { "teste": "teste" } ];
        return data;
      } );

    let horariosObs = []
    let linha = '500'
    horariosObs = await service.lista_horarioObs(linha);
    expect( horariosObs.length ).toBeGreaterThan( 0 );
  } );

} );
