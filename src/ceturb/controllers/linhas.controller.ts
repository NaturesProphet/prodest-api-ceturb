import { Controller, Get, Res } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LinhasService } from '../services/linhas.service';

@Controller( 'linhas' )
@ApiUseTags( 'Linhas' )
export class LinhasController {

    constructor( public service: LinhasService ) { }

    @Get()
    @ApiOperation( { title: 'lista as linhas existentes' } )
    @ApiResponse( { status: 200, description: 'Found.' } )
    @ApiResponse( { status: 404, description: 'Not found.' } )
    public async listar () {
        return await this.service.retornar_linhas()
    }


    @Get( '/novo' )
    public async listarnovo () {
        return await this.service.NovoRetornarLinhas()
    }
}
