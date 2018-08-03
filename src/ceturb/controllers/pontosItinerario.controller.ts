import { Controller, Get, Res } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PontoItinerarioService } from '../services/pontos_x_itinerarios.service';
import { PontoItinerario } from '../models/pontoItinerario.entity';
import { InformationNotFound } from '../models/exception/InformationNotFound';

@Controller( 'pontosItinerarios' )
@ApiUseTags( 'Pontos x Itinerarios' )
export class PontosItinerariosController {

    constructor( public service: PontoItinerarioService ) { }

    @Get()
    @ApiOperation( {
        description: 'retornar as associações pontos x itinerários',
        title: 'Pontos x Itinerários',
    } )
    @ApiResponse( {
        status: 200,
        description: 'Lista de associações entre pontos e itinerários',
        type: PontoItinerario,
    } )
    @ApiResponse( { status: 204, description: 'Dados não encontrados' } )
    async retornar_pontosItinerarios () {
        try {
            return await this.service.retornar_pontosItinerarios();
        } catch ( error ) {
            throw new InformationNotFound( 'Dados não encontrados' );
        }
    }
}
