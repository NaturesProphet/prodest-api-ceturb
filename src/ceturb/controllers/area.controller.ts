import { Controller, Post, Res, Body, HttpStatus, Param, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiImplicitParam } from '@nestjs/swagger';
import { AreaService } from '../services/area.service';
import { InformationNotFound } from '../models/exception/InformationNotFound';

@Controller( 'area' )
@ApiUseTags( 'Area' )
export class AreaController {
    constructor( private readonly Service: AreaService ) { }


    @Get( '/:left/:top/:right/:bottom' )
    @ApiOperation( {
        description: "Retorna um array com os ids dos pontos de parada dentro da area do mapa especificada."
            + "\nAlguns valores para teste: \n"
            + "left: -20.282983882640348 \n"
            + "top: -40.309548147161195 \n"
            + "right: -40.29407716556429\n"
            + "bottom: -20.274791927077008 \n"
            + "A URL para essa busca ficaria assim:\n"
            + "/area/-40.309548147161195/-20.282983882640348/-40.29407716556429/-20.274791927077008",
        title: "Pontos de parada por Area do mapa"
    } )
    @ApiResponse( { status: 200, description: "Pontos encontrados" } )
    @ApiResponse( { status: 204, description: "Pontos não encontrados" } )
    @ApiResponse( { status: 400, description: "Parâmetros fora do formato numérico" } )
    @ApiImplicitParam( {
        name: 'bottom',
        description: 'Coordenada do ponto geográfico direito inferior (SIGNED FLOAT)',
        required: true,
    } )
    @ApiImplicitParam( {
        name: 'right',
        description: 'Coordenada do ponto geográfico direito superior (SIGNED FLOAT)',
        required: true,
    } )
    @ApiImplicitParam( {
        name: 'top',
        description: 'Coordenada do ponto geográfico esquerdo superior (SIGNED FLOAT)',
        required: true,
    } )
    @ApiImplicitParam( {
        name: 'left',
        description: 'Coordenada do ponto geográfico esquerdo inferior (SIGNED FLOAT)',
        required: true,
    } )




    async retornar_pontos_por_area_do_mapa ( @Res() res, @Param() params ) {
        try {
            let Left: number = parseFloat( params.left );
            let Top: number = parseFloat( params.top );
            let Right: number = parseFloat( params.right );
            let Bottom: number = parseFloat( params.bottom );
            let coordenadas = [ Left, Top, Right, Bottom ];

            //verifica se algum valor informado não era um numero
            if ( !Number.isNaN( Left ) && !Number.isNaN( Top )
                && !Number.isNaN( Right ) && !Number.isNaN( Bottom ) ) {
                res
                    .status( HttpStatus.OK )
                    .send( await this.Service.BuscaPontosPorArea( coordenadas ) );
            } else {
                res
                    .status( HttpStatus.BAD_REQUEST )
                    .send( "Um dos parâmetros informados não era um valor válido" );
            }
        }
        catch ( error ) {
            res
                .status( HttpStatus.NOT_FOUND )
                .send( new InformationNotFound( "Pontos não encontrados" ) );
        }
    }
}
