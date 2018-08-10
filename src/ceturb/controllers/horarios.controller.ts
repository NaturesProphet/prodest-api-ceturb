import { Controller, Get, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HorariosService } from '../services/horario.service';

@Controller( 'horarios' )
@ApiUseTags( 'Horarios' )
export class HorariosController {

    constructor( public service: HorariosService ) { }

    @Get(':linha')
    @ApiOperation( { title: 'lista as linhas existentes' } )
    @ApiResponse( { status: 200, description: 'Found.' } )
    @ApiResponse( { status: 404, description: 'Not found.' } )
    
    public async listar (@Param('linha')linha) {
        return await this.service.lista_horario(linha);
    }
}
