import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { HorariosService } from '../services/horario.service';
import { InformationNotFound } from '../models/exception/InformationNotFound';
import { Endpoints } from '../../commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;

@Controller( `${raiz}/horarios` )
@ApiUseTags( 'Horarios' )
export class HorariosController {

    constructor( public service: HorariosService ) { }

    @Get( ':linha' )
    @ApiOperation( { title: 'lista as linhas existentes' } )
    @ApiResponse( { status: 200, description: 'Horarios encontrados' } )
    @ApiResponse( { status: 204, description: 'Horários não encontrados' } )
    @ApiImplicitParam( {
        name: 'linha',
        description: 'Numero de bandeira da Linha',
        required: true,
    } )

    public async listar ( @Param( 'linha' ) linha, @Res() res ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.service.lista_horario( linha ) );
        } catch ( err ) {
            res
                .status( HttpStatus.NO_CONTENT )
                .send( new InformationNotFound( "Horario não encontrado" ) );
        }
    }


    @Get( '/obs/:linha' )
    @ApiOperation( { title: 'lista as linhas existentes' } )
    @ApiResponse( { status: 200, description: 'linhas encontradas' } )
    @ApiResponse( { status: 204, description: 'Linhas não encontradas' } )
    @ApiImplicitParam( {
        name: 'linha',
        description: 'Numero de bandeira da Linha',
        required: true,
    } )

    public async listarObs ( @Param( 'linha' ) linha, @Res() res ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.service.lista_horarioObs( linha ) );
        } catch ( err ) {
            res
                .status( HttpStatus.NO_CONTENT )
                .send( new InformationNotFound( "Observações não encontradas" ) );
        }
    }
}
