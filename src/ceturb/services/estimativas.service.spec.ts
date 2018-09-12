import { Test, TestingModule } from '@nestjs/testing';
import { EstimativasService } from './estimativas.service';

describe( 'EstimativasService', () => {
  let service: EstimativasService;
  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ EstimativasService ],
    } ).compile();
    service = module.get<EstimativasService>( EstimativasService );
  } );



  it( 'should be defined', () => {
    expect( service ).toBeDefined();
  } );
} );
