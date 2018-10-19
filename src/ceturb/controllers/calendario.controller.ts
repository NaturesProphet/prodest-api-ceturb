import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InformationNotFound } from '../models/exception/InformationNotFound';
import { CalendarioService } from '../services/calendario.service';
import { Endpoints } from '../../commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;

@Controller( `${raiz}/calendario` )
@ApiUseTags( 'Calendario' )
export class CalendarioController {

    constructor( public service: CalendarioService ) { }

    @Get()
    @ApiOperation( { title: 'lista os calendarios' } )
    @ApiResponse( { status: 200, description: 'Calendario Encontrado' } )
    @ApiResponse( { status: 204, description: 'Calendario Não Encontrado' } )
    public async listar ( @Res() res ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.service.listar_calendario() );
        } catch ( err ) {
            res.status( HttpStatus.NOT_FOUND )
                .send( new InformationNotFound( "Calendario Não Encontrada" ) );
        }
    }
}
