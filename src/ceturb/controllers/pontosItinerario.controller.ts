import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PontoItinerarioService } from '../services/pontos_x_itinerarios.service';
import { PontoItinerario } from '../models/pontoItinerario.entity';
import { Endpoints } from '../../commom/configs/endpoints.config';
import { ErrorMessage } from '../../commom/DTOs/errorMessages/errorMessage';
const raiz: string = new Endpoints().rotaRaiz;
const path: string = `${raiz}/pontos/itinerarios`;

@Controller( `${raiz}/pontos/itinerarios` )
@ApiUseTags( 'Pontos x Itinerarios' )
export class PontosItinerariosController {

    constructor( public service: PontoItinerarioService ) { }

    @Get()
    @ApiOperation( {
        description: 'retornar todas as associações entre pontos e itinerários',
        title: 'Pontos associados a Itinerários',
    } )
    @ApiResponse( {
        status: 200,
        description: 'Lista de associações entre pontos e itinerários',
        type: PontoItinerario,
        isArray: true
    } )
    @ApiResponse( {
        status: 204,
        description: 'Dados não encontrados',
        type: ErrorMessage
    } )
    async retornar_pontosItinerarios ( @Res() res ) {
        try {
            let dados = await this.service.retornar_pontosItinerarios();
            res
                .status( HttpStatus.OK )
                .send( dados );
        } catch ( error ) {
            let msg: string = error.message;
            let rota: string = path;
            let status: number = HttpStatus.BAD_GATEWAY;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( resposta );
        }
    }
}
