import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { ItinerarioService } from '../services/itinerario.service';
import { Itinerario } from '../models/Itinerario.model';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { Viagem } from '../models/Viagem.model';

@Controller( 'transcoldb/itinerario' )
@ApiUseTags( 'Itinerarios@TranscolDB' )
export class ItinerarioController {
    constructor( private readonly Service: ItinerarioService ) { }


    @Get()
    @ApiOperation( {
        description: "Listar itinerarios registrados no banco auxiliar",
        title: "Itinerarios em @TranscolDB"
    } )
    @ApiResponse( { status: 302, description: "Itinerarios encontrados" } )
    @ApiResponse( { status: 404, description: "Itinerarios não encontrados" } )
    @ApiResponse( { status: 502, description: "Erro na busca" } )

    async getItinerarios ( @Res() res ) {
        try {
            let itinerarios: Itinerario[] = await this.Service.getItinerarios();
            if ( itinerarios.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( itinerarios );
            } else {
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( "Nenhum itinerario encontrado na busca" )
            }
        } catch ( err ) {
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( err.message );
        }
    }


    @Get( '/:codigo' )
    @ApiOperation( {
        description: "Listar os itinerarios de uma linha especifica no banco auxiliar pelo seu codigo",
        title: "Itinerarios por Linha em @TranscolDB"
    } )
    @ApiResponse( { status: 302, description: "Itinerarios encontrados" } )
    @ApiResponse( { status: 404, description: "Itinerarios não encontrados" } )
    @ApiResponse( { status: 502, description: "Erro na busca" } )
    @ApiImplicitParam( {
        name: 'codigo',
        description: 'codigo da linha (não é o id, é o código)',
        required: true,
    } )
    async getItinerariosByCodigo ( @Res() res, @Param( 'codigo' ) codigo ) {
        try {
            let itinerarios: Itinerario[] = await this.Service.getItinerariosByCodigo( codigo );
            if ( itinerarios.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( itinerarios );
            } else {
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( "Nenhum itinerario encontrado na busca" )
            }
        } catch ( err ) {
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( err.message );
        }
    }


    @Get( '/viagem/:codigo' )
    @ApiOperation( {
        description: "Listar as viagems de um itinerário especifico no banco auxiliar pelo seu codigo",
        title: "Viagems por Itinerario em @TranscolDB"
    } )
    @ApiResponse( { status: 302, description: "Viagems encontradas" } )
    @ApiResponse( { status: 404, description: "Viagems não encontrados" } )
    @ApiResponse( { status: 502, description: "Erro na busca" } )
    @ApiImplicitParam( {
        name: 'codigo',
        description: 'codigo do itinerario (não é o id, é o código)',
        required: true,
    } )
    async getViagemsByCodigo ( @Res() res, @Param( 'codigo' ) codigo ) {
        try {
            let viagems: Viagem[] = await this.Service.getViagemByItinerarioCode( codigo );
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
