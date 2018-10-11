import { Controller, Get, Res, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AgenciasService } from '../services/agencia.ceturb.service';
import { InformationNotFound } from '../models/exception/InformationNotFound';

@Controller( 'agencias' )
@ApiUseTags( 'Agencias' )
export class AgenciaController {

    constructor( public service: AgenciasService ) { }

    @Get()
    @ApiOperation( { title: 'lista as agencias existentes' } )
    @ApiResponse( { status: 200, description: 'Agencia Encontrada' } )
    @ApiResponse( { status: 204, description: 'Agencia Não Encontrada' } )
    public async listar ( @Res() res ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.service.listar_agencias() );
        } catch ( err ) {
            res.status( HttpStatus.NO_CONTENT )
                .send( new InformationNotFound( "Agencia Não Encontrada" ) );
        }
    }
}
