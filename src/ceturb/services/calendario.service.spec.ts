import { Test, TestingModule } from '@nestjs/testing';
import { CalendarioService } from './calendario.service';
jest.mock( './calendario.service' );

describe( 'CalendarioService', () => {
  let service: CalendarioService;

  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ CalendarioService ],
    } ).compile();
    service = module.get<CalendarioService>( CalendarioService );
  } );

  it( 'O retorno de Calendarios deve ser maior do que 0', async () => {

    let calendarios;
    calendarios = await service.listar_calendario();
    let lista = JSON.stringify( calendarios.Calendarios );
    expect( lista.length ).toBeGreaterThan( 0 );
  } );

} );

