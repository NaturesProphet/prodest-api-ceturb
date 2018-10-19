import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { Controller, Get, Res, HttpStatus, Param } from "@nestjs/common";
import { EstimativasService } from '../services/estimativas.service';
import { InformationNotFound } from '../models/exception/InformationNotFound';
import { Endpoints } from '../../commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;

@Controller( `${raiz}/estimativas` )
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
    @ApiImplicitParam( {
        name: 'id',
        description: 'Numero de identificação do ponto de origem',
        required: true,
    } )

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


    @Get( "/origemEDestino/:id_origem/:id_destino" )
    @ApiOperation( {
        description: "retornar estimativas por ponto de origem e ponto destino",
        title: "Estimativas por Origem e Destino"
    } )
    @ApiResponse( { status: 200, description: "Estimativas encontradas" } )
    @ApiResponse( { status: 404, description: "Estimativas não encontrados" } )
    @ApiImplicitParam( {
        name: 'id_origem',
        description: 'Numero de identificação do ponto de origem',
        required: true,
    } )
    @ApiImplicitParam( {
        name: 'id_destino',
        description: 'Numero de identificação do ponto de destino',
        required: true,
    } )
    async retornar_estimativas_por_origem_e_destino ( @Res() res, @Param() params ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.Service.ObterPorOrigemEDestino( params ) );
        }
        catch ( error ) {
            res
                .status( HttpStatus.NOT_FOUND )
                .send( new InformationNotFound( "Estimativas não encontradas" ) );
        }
    }


    @Get( "/origemELinha/:id_origem/:id_linha" )
    @ApiOperation( {
        description: "retornar estimativas por ponto de origem e linha",
        title: "Estimativas por Origem e linha"
    } )
    @ApiResponse( { status: 200, description: "Estimativas encontradas" } )
    @ApiResponse( { status: 404, description: "Estimativas não encontrados" } )
    @ApiImplicitParam( {
        name: 'id_origem',
        description: 'Numero de identificação do ponto de origem',
        required: true,
    } )
    @ApiImplicitParam( {
        name: 'id_linha',
        description: 'Numero de identificação da linha',
        required: true,
    } )
    async retornar_estimativas_por_origem_e_linha ( @Res() res, @Param() params ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.Service.ObterPorOrigemELinha( params ) );
        }
        catch ( error ) {
            res
                .status( HttpStatus.NOT_FOUND )
                .send( new InformationNotFound( "Estimativas não encontradas" ) );
        }
    }
}
