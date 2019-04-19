import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ItinerariosService } from '../services/itinerarios.service';
import { rootEndPoint as raiz } from '../../commom/configs/endpoints.config';
import { itinerarioDto } from '../../ceturb/models/dto/itinerario.dto';
import { ErrorMessage } from '../../commom/DTOs/errorMessages/errorMessage';
const path = `${raiz}/itinerarios`;

@Controller( `${raiz}/itinerarios` )
@ApiUseTags( 'Itinerarios' )
export class ItinerariosController {

    constructor( private readonly service: ItinerariosService ) { }

    @Get()
    @ApiOperation( {
        title: 'Listar itinerarios',
        description: 'lista os itinerários existentes. \nOrigem: Geocontrol'
    } )
    @ApiResponse( {
        status: 200,
        description: 'Itinerários encontrados',
        type: itinerarioDto,
        isArray: true
    } )
    @ApiResponse( {
        status: 204,
        description: 'Itinerários não encontrados',
        type: ErrorMessage
    } )
    public async listar ( @Res() res ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.service.lista_itinerario() );
        } catch ( err ) {
            let msg: string = err.message;
            let rota: string = `${path}`;
            let status: number = HttpStatus.BAD_GATEWAY;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( resposta )
        }
    }
}
