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
}
