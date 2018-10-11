import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { PontoService } from '../services/ponto.service';
import { Ponto } from '../models/Ponto.model';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { Estimativa } from '../models/Estimativa.model';

@Controller( 'transcoldb/ponto' )
@ApiUseTags( 'Pontos@TranscolDB' )
export class PontoController {
    constructor( private readonly Service: PontoService ) { }


    @Get()
    @ApiOperation( {
        description: "Listar pontos registrados no banco auxiliar",
        title: "Pontos em @TranscolDB"
    } )
    @ApiResponse( { status: 302, description: "Pontos encontrados" } )
    @ApiResponse( { status: 404, description: "Pontos não encontrados" } )
    @ApiResponse( { status: 502, description: "Erro na busca" } )

    async getPontos ( @Res() res ) {
        try {
            let pontos: Ponto[] = await this.Service.getPontos();
            if ( pontos.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( pontos );
            } else {
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( "Nenhum ponto encontrado na busca" )
            }
        } catch ( err ) {
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( err.message );
        }
    }





    @Get( '/estimativas/:codigo' )
    @ApiOperation( {
        description: "Listar as estimativas de viagems no banco auxiliar registradas para o ponto indicado",
        title: "Estimativas em @TranscolDB"
    } )
    @ApiResponse( { status: 302, description: "Estimativas encontrados" } )
    @ApiResponse( { status: 404, description: "Estimativas não encontrados" } )
    @ApiResponse( { status: 502, description: "Erro na busca" } )
    @ApiImplicitParam( {
        name: 'codigo',
        description: 'codigo do ponto de ônibus (não é o id, é o código)',
        required: true,
    } )

    async getEstimativa ( @Res() res, @Param( 'codigo' ) codigo ) {
        try {
            let estimativas: Estimativa[] = await this.Service.getEstimativas( codigo );
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
