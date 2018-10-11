import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { PontogeograficoService } from '../services/pontogeografico.service';
import { PontoGeografico } from '../models/PontoGeografico.model';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller( 'transcoldb/pontogeografico' )
@ApiUseTags( 'Pontos Geográficos em @TranscolDB' )
export class BDPontogeograficoController {
    constructor( private readonly Service: PontogeograficoService ) { }


    @Get()
    @ApiOperation( {
        description: "Listar pontos geográficos registradas no banco auxiliar",
        title: "Pontos Geográficos em @TranscolDB"
    } )
    @ApiResponse( { status: 302, description: "pontos geográficos encontrados" } )
    @ApiResponse( { status: 404, description: "pontos geográficos não encontrados" } )
    @ApiResponse( { status: 502, description: "Erro na busca" } )

    async getPontogeograficos ( @Res() res ) {
        try {
            let pontogeograficos: PontoGeografico[] = await this.Service.getPontogeograficos();
            if ( pontogeograficos.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( pontogeograficos );
            } else {
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( "Nenhum ponto geográfico encontrado na busca" )
            }
        } catch ( err ) {
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( err.message );
        }
    }
}
