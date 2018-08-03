import { Controller, Get, Res } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ItinerariosService } from '../services/itinerarios.service';

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
}
