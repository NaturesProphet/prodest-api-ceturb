import { Test, TestingModule } from '@nestjs/testing';
import { InformationNotFound } from './InformationNotFound';

describe( 'InformationNotFound', () => {
    let service: InformationNotFound;

    it( '', async () => {

        let erro = new InformationNotFound( "teste" );
        expect( erro.message ).toBe( "teste" );
    } );

} );

