import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { EstimativaService } from '../services/estimativa.service';
import { Estimativa } from '../models/Estimativa.model';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller( 'transcoldb/estimativa' )
@ApiUseTags( 'Estimativas@TranscolDB' )
export class EstimativaController {
    constructor( private readonly Service: EstimativaService ) { }


    @Get()
    @ApiOperation( {
        description: "Listar estimativas registradas no banco auxiliar",
        title: "Estimativas em @TranscolDB"
    } )
    @ApiResponse( { status: 302, description: "Estimativas encontradas" } )
    @ApiResponse( { status: 404, description: "Estimativas não encontradas" } )
    @ApiResponse( { status: 502, description: "Erro na busca" } )

    async getEstimativas ( @Res() res ) {
        try {
            let estimativas: Estimativa[] = await this.Service.getEstimativas();
            if ( estimativas.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( estimativas );
            } else {
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( "Nenhuma estimativa encontrada na busca" )
            }
        } catch ( err ) {
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( err.message );
        }
    }
}
