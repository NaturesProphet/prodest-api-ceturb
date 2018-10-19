import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { GtfsService } from '../services/gtfs.service';
import { Endpoints } from '../../commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;

@Controller( `${raiz}/gtfs` )
@ApiUseTags( 'GTFS' )
export class GtfsController {

    constructor( public service: GtfsService ) { }

    @Get()
    @ApiOperation( { title: 'lista os arquivos GTFS existentes no minio' } )
    @ApiResponse( { status: 200, description: 'Gtfs Encontrado' } )
    @ApiResponse( { status: 404, description: 'Gtfs Não Encontrado' } )
    @ApiResponse( { status: 500, description: 'Erro interno no servidor' } )
    public async getAll ( @Res() res ) {
        try {
            let response = await this.service.getAll();
            if ( response.length > 0 ) {
                res
                    .status( HttpStatus.OK )
                    .send( response );
            }
            else {
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( "Não há arquivos registrados" );
            }

        } catch ( err ) {
            res.status( HttpStatus.INTERNAL_SERVER_ERROR )
                .send( 'Ocorreu um erro interno no servidor.' );
        }
    }

    @Get( '/:ano' )
    @ApiOperation( { title: 'lista os arquivos GTFS existentes no minio de um ano específicos' } )
    @ApiResponse( { status: 200, description: 'Gtfs Encontrado' } )
    @ApiResponse( { status: 404, description: 'Gtfs Não Encontrado' } )
    @ApiResponse( { status: 500, description: 'Erro interno no servidor' } )
    @ApiImplicitParam( {
        name: 'ano',
        description: 'Ano do GTFS',
        required: true,
    } )
    public async getByYear ( @Param( 'ano' ) ano, @Res() res ) {
        try {
            let response = await this.service.getByYear( ano );
            if ( response.length > 0 ) {
                res
                    .status( HttpStatus.OK )
                    .send( response );
            }
            else {
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( "Não há arquivos registrados nesse ano" );
            }

        } catch ( err ) {
            res.status( HttpStatus.INTERNAL_SERVER_ERROR )
                .send( 'Ocorreu um erro interno no servidor.' );
        }
    }

    @Get( '/:year/:month' )
    @ApiOperation( { title: 'lista os arquivos GTFS existentes no minio de um ano e mês específicos' } )
    @ApiResponse( { status: 200, description: 'Gtfs Encontrado' } )
    @ApiResponse( { status: 404, description: 'Gtfs Não Encontrado' } )
    @ApiResponse( { status: 500, description: 'Erro interno no servidor' } )
    @ApiImplicitParam( {
        name: 'year',
        description: 'Ano do GTFS',
        required: true,
    } )
    @ApiImplicitParam( {
        name: 'month',
        description: 'Mês do GTFS',
        required: true,
    } )
    public async getByYearMonth ( @Param( 'year' ) year, @Param( 'month' ) month, @Res() res ) {
        try {
            let response = await this.service.getByYearMonth( year, month );
            if ( response.length > 0 ) {
                res
                    .status( HttpStatus.OK )
                    .send( response );
            }
            else {
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( "Não há arquivos registrados nesse ano e mês" );
            }

        } catch ( err ) {
            res.status( HttpStatus.INTERNAL_SERVER_ERROR )
                .send( 'Ocorreu um erro interno no servidor.' );
        }
    }

    @Get( '/:year/:month/:day' )
    @ApiOperation( { title: 'lista os arquivos GTFS existentes no minio de um ano e mês específicos' } )
    @ApiResponse( { status: 200, description: 'Gtfs Encontrado' } )
    @ApiResponse( { status: 204, description: 'Gtfs Não Encontrado' } )
    @ApiResponse( { status: 500, description: 'Erro interno no servidor' } )
    @ApiImplicitParam( {
        name: 'year',
        description: 'Ano do GTFS',
        required: true,
    } )
    @ApiImplicitParam( {
        name: 'month',
        description: 'Mês do GTFS',
        required: true,
    } )
    @ApiImplicitParam( {
        name: 'day',
        description: 'Dia do GTFS',
        required: true,
    } )
    public async getByYearMonthDay ( @Param( 'year' ) year, @Param( 'month' ) month, @Param( 'day' ) day, @Res() res ) {
        try {
            let response = await this.service.getByYearMonthDay( year, month, day );
            if ( response.length > 0 ) {
                res
                    .status( HttpStatus.OK )
                    .send( response );
            }
            else {
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( "Não há arquivos registrados nesse ano, mês e dia" );
            }
        } catch ( err ) {
            res.status( HttpStatus.INTERNAL_SERVER_ERROR )
                .send( 'Ocorreu um erro interno no servidor.' );
        }
    }
}
