import { Controller, Get, Res, Param, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ItinerariosService } from '../services/itinerarios.service';
import { InformationNotFound } from '../models/exception/InformationNotFound';

@Controller( 'itinerarios' )
@ApiUseTags( 'Itinerarios' )
export class ItinerariosController {

    constructor( private readonly service: ItinerariosService ) { }

    @Get()
    @ApiOperation( { title: 'lista os itinerários existentes' } )
    @ApiResponse( { status: 200, description: 'Itinerários encontrados' } )
    @ApiResponse( { status: 204, description: 'Itinerários não encontrados' } )
    public async listar ( @Res() res ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.service.lista_itinerario() );
        } catch ( err ) {
            res
                .status( HttpStatus.NO_CONTENT )
                .send( new InformationNotFound( "Não há registros" ) )
        }
    }

    @Get( '/:linha' )
    @ApiOperation( { title: 'lista os itinerários existentes de uma linha' } )
    @ApiResponse( { status: 200, description: 'itinerário encontrado' } )
    @ApiResponse( { status: 204, description: 'Itinerario não encontrado' } )
    public async buscar ( @Param( 'linha' ) linha, @Res() res ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.service.busca_itinerario( linha ) );
        } catch ( err ) {
            res
                .status( HttpStatus.NO_CONTENT )
                .send( new InformationNotFound( "Não há registros" ) )
        }
    }
}
