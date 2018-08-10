import { Controller, Get, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HorariosService } from '../services/horario.service';
import { HorariosObsService } from '../services/horarioObs.service';

@Controller( 'horarios' )
@ApiUseTags( 'Horarios' )
export class HorariosController {

    constructor( public service: HorariosService, public obsService: HorariosObsService ) { }

    @Get(':linha')
    @ApiOperation( { title: 'lista as linhas existentes' } )
    @ApiResponse( { status: 200, description: 'Found.' } )
    @ApiResponse( { status: 404, description: 'Not found.' } )
    
    public async listar (@Param('linha')linha) {
        return await this.service.lista_horario(linha);
    }
    
    @Get('/obs/:linha')
    @ApiOperation( { title: 'lista as linhas existentes' } )
    @ApiResponse( { status: 200, description: 'Found.' } )
    @ApiResponse( { status: 404, description: 'Not found.' } )

    public async listarObs (@Param('linha')linha) {
        return await this.obsService.lista_horarioObs(linha);
    }
}
