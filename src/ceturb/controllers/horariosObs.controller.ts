import { Controller, Get, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HorariosObsService } from '../services/horarioObs.service';

@Controller( 'horariosObs' )
@ApiUseTags( 'HorariosObs' )
export class HorariosObsController {

    constructor( public service: HorariosObsService ) { }

    @Get(':linha')
    @ApiOperation( { title: 'lista as linhas existentes' } )
    @ApiResponse( { status: 200, description: 'Found.' } )
    @ApiResponse( { status: 404, description: 'Not found.' } )
    
    public async listar (@Param('linha')linha) {
        return await this.service.lista_horarioObs(linha);
    }
}
