import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HorariosService } from '../services/horario.service';
import { InformationNotFound } from '../models/exception/InformationNotFound';

@Controller( 'horarios' )
@ApiUseTags( 'Horarios' )
export class HorariosController {

    constructor( public service: HorariosService ) { }

    @Get( ':linha' )
    @ApiOperation( { title: 'lista as linhas existentes' } )
    @ApiResponse( { status: 200, description: 'Horarios encontrados' } )
    @ApiResponse( { status: 204, description: 'Horários não encontrados' } )

    public async listar ( @Param( 'linha' ) linha, @Res() res ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.service.lista_horario( linha ) );
        } catch ( err ) {
            res
                .status( HttpStatus.NO_CONTENT )
                .send( new InformationNotFound( "Horario não encontrado" ) );
        }
    }


    @Get( '/obs/:linha' )
    @ApiOperation( { title: 'lista as linhas existentes' } )
    @ApiResponse( { status: 200, description: 'linhas encontradas' } )
    @ApiResponse( { status: 204, description: 'Linhas não encontradas' } )

    public async listarObs ( @Param( 'linha' ) linha, @Res() res ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.service.lista_horarioObs( linha ) );
        } catch ( err ) {
            res
                .status( HttpStatus.NO_CONTENT )
                .send( new InformationNotFound( "Observações não encontradas" ) );
        }
    }
}
