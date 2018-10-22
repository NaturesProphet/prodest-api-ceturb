import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { LinhasService } from '../services/linhas.service';
import { InformationNotFound } from '../models/exception/InformationNotFound';
import { Endpoints } from '../../commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;

@Controller( `${raiz}/linha` )
@ApiUseTags( 'Linhas' )
export class LinhasController {

    constructor( public service: LinhasService ) { }

    @Get()
    @ApiOperation( { title: 'lista as linhas existentes' } )
    @ApiResponse( { status: 200, description: 'Linhas encontradas' } )
    @ApiResponse( { status: 204, description: 'Linhas não encontradas' } )
    public async listar ( @Res() res ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.service.retornar_linhas() );
        } catch ( err ) {
            res
                .status( HttpStatus.NO_CONTENT )
                .send( new InformationNotFound( "Não há registros" ) )
        }
    }



    @Get( '/:numero/itinerarios' )
    @ApiOperation( { title: 'lista os itinerários existentes de uma linha' } )
    @ApiResponse( { status: 200, description: 'itinerário encontrado' } )
    @ApiResponse( { status: 204, description: 'Itinerario não encontrado' } )
    @ApiImplicitParam( {
        name: 'numero',
        description: 'Numero de bandeira da Linha',
        required: true,
    } )
    public async buscar ( @Param( 'numero' ) numero, @Res() res ) {
        try {
            let response = await this.service.busca_itinerario( numero );
            let itinerarios = JSON.parse( JSON.stringify( response ) );
            if ( itinerarios.length > 0 )
                res
                    .status( HttpStatus.OK )
                    .send( response );
            else {
                res
                    .status( HttpStatus.OK )
                    .send( "Não há registros de itinerarios para essa linha" );
            }

        } catch ( err ) {
            res
                .status( HttpStatus.INTERNAL_SERVER_ERROR )
                .send( err.message )
        }
    }



    @Get( '/:numero/horarios' )
    @ApiOperation( { title: 'lista os horarios de uma linha' } )
    @ApiResponse( { status: 200, description: 'Horarios encontrados' } )
    @ApiResponse( { status: 204, description: 'Horários não encontrados' } )
    @ApiImplicitParam( {
        name: 'numero',
        description: 'Numero de bandeira da Linha',
        required: true,
    } )

    public async listarHorarios ( @Param( 'numero' ) numero, @Res() res ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.service.lista_horario( numero ) );
        } catch ( err ) {
            res
                .status( HttpStatus.NO_CONTENT )
                .send( new InformationNotFound( "Horario não encontrado" ) );
        }
    }


    @Get( '/:numero/horarios/obs' )
    @ApiOperation( { title: 'lista as possíveis observações sobre os horarios de uma linha' } )
    @ApiResponse( { status: 200, description: 'Observações encontradas' } )
    @ApiResponse( { status: 204, description: 'Não há observações' } )
    @ApiImplicitParam( {
        name: 'numero',
        description: 'Numero de bandeira da Linha',
        required: true,
    } )

    public async listarObs ( @Param( 'numero' ) numero, @Res() res ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.service.lista_horarioObs( numero ) );
        } catch ( err ) {
            res
                .status( HttpStatus.NO_CONTENT )
                .send( new InformationNotFound( "Observações não encontradas" ) );
        }
    }

}
