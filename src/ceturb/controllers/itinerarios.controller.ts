import { Controller, Get, Res, Param, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { ItinerariosService } from '../services/itinerarios.service';
import { InformationNotFound } from '../models/exception/InformationNotFound';
import { Endpoints } from '../../commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;

@Controller( `${raiz}/itinerarios` )
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
    @ApiImplicitParam( {
        name: 'linha',
        description: 'Numero de bandeira da Linha',
        required: true,
    } )
    public async buscar ( @Param( 'linha' ) linha, @Res() res ) {
        try {
            let response = await this.service.busca_itinerario( linha );
            let itinerarios = JSON.parse( JSON.stringify( response ) );
            if ( itinerarios.length > 0 )
                res
                    .status( HttpStatus.OK )
                    .send( response );
            else {
                res
                    .status( HttpStatus.OK )
                    .send( "Não há registros de itinerarios para essa linha" );
            }

        } catch ( err ) {
            res
                .status( HttpStatus.INTERNAL_SERVER_ERROR )
                .send( err.message )
        }
    }
}
