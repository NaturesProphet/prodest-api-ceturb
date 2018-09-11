import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Res, HttpStatus, Param, Post, Body } from "@nestjs/common";
import { EstimativasService } from '../services/estimativas.service';
import { InformationNotFound } from '../models/exception/InformationNotFound';
import { OrigemEDestino } from '../models/origemEDestino.Dto';
import { OrigemELinha } from '../models/origemELinha.Dto';

@Controller( 'estimativas' )
@ApiUseTags( 'Estimativas' )
export class EstimativasController {
    constructor( private readonly Service: EstimativasService ) { }

    @Get( "/origem/:id" )
    @ApiOperation( {
        description: "retornar estimativas por ponto de origem",
        title: "Estimativas por Origem"
    } )
    @ApiResponse( { status: 200, description: "Estimativas encontradas" } )
    @ApiResponse( { status: 204, description: "Estimativas não encontrados" } )
    async retornar_estimativas_por_origem ( @Res() res, @Param() params ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.Service.ObterPorOrigem( params ) );
        }
        catch ( error ) {
            res
                .status( HttpStatus.NOT_FOUND )
                .send( new InformationNotFound( "Estimativas não encontradas" ) );
        }
    }


    @Post( "/origemEDestino" )
    @ApiOperation( {
        description: "retornar estimativas por ponto de origem e ponto destino",
        title: "Estimativas por Origem e Destino"
    } )
    @ApiResponse( { status: 200, description: "Estimativas encontradas" } )
    @ApiResponse( { status: 204, description: "Estimativas não encontrados" } )
    async retornar_estimativas_por_origem_e_destino ( @Res() res, @Body() body: OrigemEDestino ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.Service.ObterPorOrigemEDestino( body ) );
        }
        catch ( error ) {
            res
                .status( HttpStatus.NOT_FOUND )
                .send( new InformationNotFound( "Estimativas não encontradas" ) );
        }
    }


    @Post( "/origemELinha" )
    @ApiOperation( {
        description: "retornar estimativas por ponto de origem e linha",
        title: "Estimativas por Origem e linha"
    } )
    @ApiResponse( { status: 200, description: "Estimativas encontradas" } )
    @ApiResponse( { status: 204, description: "Estimativas não encontrados" } )
    async retornar_estimativas_por_origem_e_linha ( @Res() res, @Body() body: OrigemELinha ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.Service.ObterPorOrigemELinha( body ) );
        }
        catch ( error ) {
            res
                .status( HttpStatus.NOT_FOUND )
                .send( new InformationNotFound( "Estimativas não encontradas" ) );
        }
    }
}