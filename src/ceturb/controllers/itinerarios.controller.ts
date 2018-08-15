import { Controller, Get, Res, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ItinerariosService } from '../services/itinerarios.service';
import { InformationNotFound } from '../models/exception/InformationNotFound';

@Controller( 'itinerarios' )
@ApiUseTags( 'Itinerarios' )
export class ItinerariosController {

    constructor( private readonly service: ItinerariosService ) { }

    @Get()
    @ApiOperation( { title: 'lista os itinerários existentes' } )
    @ApiResponse( { status: 200, description: 'Found.' } )
    @ApiResponse( { status: 404, description: 'Not found.' } )
    public async listar () {
        return await this.service.lista_itinerario();
    }

    @Get( '/:linha' )
    @ApiOperation( { title: 'lista os itinerários existentes de uma linha' } )
    @ApiResponse( { status: 200, description: 'Found.' } )
    @ApiResponse( { status: 404, description: 'Not found.' } )
    public async buscar ( @Param( 'linha' ) linha ) {
        return await this.service.busca_itinerario( linha );
    }
}
