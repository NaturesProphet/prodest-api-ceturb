import { Controller, Get, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HorariosService } from '../services/horario.service';
import { InformationNotFound } from '../models/exception/InformationNotFound';

@Controller( 'horarios' )
@ApiUseTags( 'Horarios' )
export class HorariosController {

    constructor( public service: HorariosService ) { }

    @Get( ':linha' )
    @ApiOperation( { title: 'lista as linhas existentes' } )
    @ApiResponse( { status: 200, description: 'Found.' } )
    @ApiResponse( { status: 204, description: 'No content.' } )

    public async listar ( @Param( 'linha' ) linha ) {
        try {
            return await this.service.lista_horario( linha );
        } catch ( err ) {
            throw new InformationNotFound( "Horario não encontrado" );
        }
    }

    @Get( '/obs/:linha' )
    @ApiOperation( { title: 'lista as linhas existentes' } )
    @ApiResponse( { status: 200, description: 'Found.' } )
    @ApiResponse( { status: 404, description: 'Not found.' } )

    public async listarObs ( @Param( 'linha' ) linha ) {
        try {
            return await this.service.lista_horarioObs( linha );
        } catch ( err ) {
            throw new InformationNotFound( "Observações não encontradas" );
        }
    }
}
