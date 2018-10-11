import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ItinerariopontoService } from '../services/itinerarioponto.service';
import { ItinerarioPonto } from '../models/itinerario_ponto.model';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller( 'transcoldb/itinerario_ponto' )
@ApiUseTags( 'Tabela intermediária itinerario_ponto em @TranscolDB' )
export class BDItinerariopontoController {
    constructor( private readonly Service: ItinerariopontoService ) { }


    @Get()
    @ApiOperation( {
        description: "Listar registros na tabela intermediária itinerario_ponto no banco auxiliar",
        title: "itinerario_ponto em @TranscolDB"
    } )
    @ApiResponse( { status: 302, description: "registros encontrados" } )
    @ApiResponse( { status: 404, description: "registros não encontrados" } )
    @ApiResponse( { status: 502, description: "Erro na busca" } )

    async getItinerariopontos ( @Res() res ) {
        try {
            let itinerariopontos: ItinerarioPonto[] = await this.Service.getItinerariopontos();
            if ( itinerariopontos.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( itinerariopontos );
            } else {
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( "Nenhum registro encontrado na tabela itinerario_ponto" )
            }
        } catch ( err ) {
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( err.message );
        }
    }
}
