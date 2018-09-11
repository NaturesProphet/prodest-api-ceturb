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
        description: "Retorna um array com os ids dos pontos de parada dentro da area do mapa especificada."
            + "\n" + "O formato da requisição deve estar neste formato::\n  {\n\t"
            + '"envelope": [ ­40.309548147161195, ­20.282983882640348, ­40.29407716556429, ­20.274791927077008]\n  }\n'
            + 'a chave "envelope" deve conter um Array de doubles com 4 posições (left, top, right, bottom) '
            + "representando as coordenadas do retângulo dentro do qual devem estar os pontos de parada",
        title: "Pontos de parada por Area do mapa"
    } )
    @ApiResponse( { status: 200, description: "Pontos encontrados" } )
    @ApiResponse( { status: 204, description: "Pontos não encontrados" } )
    async retornar_pontos_por_area_do_mapa ( @Res() res, @Body() body: Envelope ) {
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
