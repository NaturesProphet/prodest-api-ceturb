import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GtfsService } from '../services/gtfs.service';
import { InformationNotFound } from '../models/exception/InformationNotFound';

@Controller( 'gtfs' )
@ApiUseTags( 'GTFS' )
export class GtfsController {

    constructor( public service: GtfsService ) { }

    @Get()
    @ApiOperation( { title: 'lista os arquivos GTFS existentes no minio' } )
    @ApiResponse( { status: 200, description: 'Gtfs Encontrado' } )
    @ApiResponse( { status: 204, description: 'Gtfs Não Encontrado' } )
    public async getAll ( @Res() res ) {
        try {
            let response = await this.service.getAll();
            if(response.length > 0 ){
                res
                    .status( HttpStatus.OK )
                    .send( response );
            }
            else{
                let erro = {message: "Não há arquivos registrados"}
                res
                    .status( HttpStatus.OK )
                    .send( erro );
            }
            
        } catch ( err ) {
            res.status( HttpStatus.NO_CONTENT )
                .send( new InformationNotFound( "Gtfs Não Encontrado" ) );
        }
    }

    @Get('/:ano')
    @ApiOperation( { title: 'lista os arquivos GTFS existentes no minio de um ano específicos' } )
    @ApiResponse( { status: 200, description: 'Gtfs Encontrado' } )
    @ApiResponse( { status: 204, description: 'Gtfs Não Encontrado' } )
    public async getByYear ( @Param( 'ano' ) ano, @Res() res ) {
        try {
            let response = await this.service.getByYear(ano);
            if( response.length > 0){
                res
                    .status( HttpStatus.OK )
                    .send( response );
            }
            else{
                let erro = {message: "Não há arquivos registrados nesse ano"}
                res
                    .status( HttpStatus.OK )
                    .send( erro );
            }
            
        } catch ( err ) {
            res.status( HttpStatus.NO_CONTENT )
                .send( new InformationNotFound( "Gtfs Não Encontrado" ) );
        }
    }

    @Get('/:year/:month')
    @ApiOperation( { title: 'lista os arquivos GTFS existentes no minio de um ano e mês específicos' } )
    @ApiResponse( { status: 200, description: 'Gtfs Encontrado' } )
    @ApiResponse( { status: 204, description: 'Gtfs Não Encontrado' } )
    public async getByYearMonth ( @Param( 'year' ) year, @Param( 'month' ) month, @Res() res ) {
        try {
            let response = await this.service.getByYearMonth(year, month);
            if(response.length > 0){
                res
                    .status( HttpStatus.OK )
                    .send( response );
            }
            else{
                let erro = {message: "Não há arquivos registrados nesse ano e mês"}
                res
                    .status( HttpStatus.OK )
                    .send( erro );
            }
            
        } catch ( err ) {
            res.status( HttpStatus.NO_CONTENT )
                .send( new InformationNotFound( "Gtfs Não Encontrado" ) );
        }
    }

    @Get('/:year/:month/:day')
    @ApiOperation( { title: 'lista os arquivos GTFS existentes no minio de um ano e mês específicos' } )
    @ApiResponse( { status: 200, description: 'Gtfs Encontrado' } )
    @ApiResponse( { status: 204, description: 'Gtfs Não Encontrado' } )
    public async getByYearMonthDay ( @Param( 'year' ) year, @Param( 'month' ) month, @Param( 'day' ) day, @Res() res ) {
        try {
            let response = await this.service.getByYearMonthDay(year, month, day);
            if (response.length > 0 ){
                    res
                .status( HttpStatus.OK )
                .send( response );
            }
            else{
                let erro = {message: "Não há arquivos registrados nesse ano, mês, dia"}
                res
                    .status( HttpStatus.OK )
                    .send( erro );
            }
        } catch ( err ) {
            res.status( HttpStatus.NO_CONTENT )
                .send( new InformationNotFound( "Gtfs Não Encontrado" ) );
        }
    }
}
