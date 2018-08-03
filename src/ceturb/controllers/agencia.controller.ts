import { Controller, Get, Res } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AgenciasService } from '../services/agencia.service';

@Controller( 'agencias' )
@ApiUseTags( 'Agencias' )
export class AgenciaController {

    constructor( public service: AgenciasService ) { }

    @Get()
    @ApiOperation( { title: 'lista as linhas existentes' } )
    @ApiResponse( { status: 200, description: 'Found.' } )
    @ApiResponse( { status: 404, description: 'Not found.' } )
    public async listar () {
        return await this.service.listar_agencias();
    }
}
