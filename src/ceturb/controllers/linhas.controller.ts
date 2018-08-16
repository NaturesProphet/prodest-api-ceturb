import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LinhasService } from '../services/linhas.service';
import { InformationNotFound } from '../models/exception/InformationNotFound';

@Controller( 'linhas' )
@ApiUseTags( 'Linhas' )
export class LinhasController {

    constructor( public service: LinhasService ) { }

    @Get()
    @ApiOperation( { title: 'lista as linhas existentes' } )
    @ApiResponse( { status: 200, description: 'Linhas encontradas' } )
    @ApiResponse( { status: 204, description: 'Linhas não encontradas' } )
    public async listar ( @Res() res ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.service.retornar_linhas() );
        } catch ( err ) {
            res
                .status( HttpStatus.NO_CONTENT )
                .send( new InformationNotFound( "Não há registros" ) )
        }
    }
}
