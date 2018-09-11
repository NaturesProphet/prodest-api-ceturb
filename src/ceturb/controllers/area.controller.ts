import { Controller, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AreaService } from '../services/area.service';
import { Envelope } from '../models/envelope.Dto';
import { InformationNotFound } from '../models/exception/InformationNotFound';

@Controller( 'area' )
@ApiUseTags( 'Area' )
export class AreaController {
    constructor( private readonly Service: AreaService ) { }


    @Post()
    @ApiOperation( {
        description: "retornar os ids dos pontos de parada dentro da area do mapa especificada",
        title: "Pontos de parada por Area do mapa"
    } )
    @ApiResponse( { status: 200, description: "Pontos encontrados" } )
    @ApiResponse( { status: 204, description: "Pontos não encontrados" } )
    async retornar_estimativas_por_origem_e_linha ( @Res() res, @Body() body: Envelope ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.Service.BuscaPontosPorArea( body ) );
        }
        catch ( error ) {
            res
                .status( HttpStatus.NOT_FOUND )
                .send( new InformationNotFound( "Pontos não encontrados" ) );
        }
    }
}

