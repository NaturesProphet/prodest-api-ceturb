import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { LinhaService } from '../services/linha.service';
import { Linha } from '../models/Linha.model';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller( 'transcoldb/linha' )
@ApiUseTags( 'Linhas@TranscolDB' )
export class LinhaController {
    constructor( private readonly Service: LinhaService ) { }


    @Get()
    @ApiOperation( {
        description: "Listar linhas registradas no banco auxiliar",
        title: "Linhas em @TranscolDB"
    } )
    @ApiResponse( { status: 302, description: "Linhas encontradas" } )
    @ApiResponse( { status: 404, description: "Linhas não encontradas" } )
    @ApiResponse( { status: 502, description: "Erro na busca" } )

    async getLinhas ( @Res() res ) {
        try {
            let linhas: Linha[] = await this.Service.getLinhas();
            if ( linhas.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( linhas );
            } else {
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( "Nenhuma linha encontrada na busca" )
            }
        } catch ( err ) {
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( err.message );
        }
    }
}
