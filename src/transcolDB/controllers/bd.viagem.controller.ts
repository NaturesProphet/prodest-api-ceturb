import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ViagemService } from '../services/viagem.service';
import { Viagem } from '../models/Viagem.model';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller( 'transcoldb/viagem' )
@ApiUseTags( 'Viagems@TranscolDB' )
export class ViagemController {
    constructor( private readonly Service: ViagemService ) { }
    @Get()
    @ApiOperation( {
        description: "Listar viagems registradas no banco auxiliar",
        title: "Viagems em @TranscolDB"
    } )
    @ApiResponse( { status: 302, description: "Viagems encontradas" } )
    @ApiResponse( { status: 404, description: "Viagems não encontradas" } )
    @ApiResponse( { status: 502, description: "Erro na busca" } )

    async getViagems ( @Res() res ) {
        try {
            let viagems: Viagem[] = await this.Service.getViagems();
            if ( viagems.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( viagems );
            } else {
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( "Nenhuma viagem encontrada na busca" )
            }
        } catch ( err ) {
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( err.message );
        }
    }
}
