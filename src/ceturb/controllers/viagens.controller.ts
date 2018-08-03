import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ViagensService } from '../services/viagens.service';


@Controller( 'viagens' )
export class ViagensController {
    constructor( private readonly service: ViagensService ) { }

    @Get()
    @ApiOperation( { title: 'lista as viagens existentes' } )
    @ApiResponse( { status: 200, description: 'Found.' } )
    @ApiResponse( { status: 404, description: 'Not found.' } )
    public async lista_viagens () {
        return await this.service.retornar_viagens();
    }
}
