import { Test, TestingModule } from '@nestjs/testing';
import { FeriadoService } from './feriado.service';
import { Feriado } from '../models/Feriado.model';
jest.mock( './feriado.service' )

describe( 'FeriadoService', () => {
  let service: FeriadoService;
  let resposta;

  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ FeriadoService ],
    } ).compile();
    service = module.get<FeriadoService>( FeriadoService );
  } );



  it( 'O retorno ao consultar uma data que é feriado deve ser true', async () => {
    let natal: Date = new Date( '2018/12/25' );
    resposta = await service.CheckFeriado( natal );
    expect( resposta.feriado ).toBe( true );
  } );



  it( 'O retorno ao consultar uma data que NÃO é feriado deve ser false', async () => {
    let diachato: Date = new Date( '2018/10/04' )
    resposta = await service.CheckFeriado( diachato )
    expect( resposta.feriado ).toBe( false );
  } );



  it( 'Espera-se que o serviço devolva um array como resposta, que seja maior que 0', async () => {
    let retorno: Feriado[] = await service.getAll();
    expect( retorno.length ).toBeGreaterThan( 0 );
  } );


} );
