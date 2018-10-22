import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { AgenciaService } from '../services/agencia.service';
import { Agencia } from '../models/Agencia.model';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { Contato } from '../models/Contato.model';
import { Feriado } from '../models/Feriado.model';
import { Tarifa } from '../models/Tarifa.model';
import { Endpoints } from '../../commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;

@Controller( `${raiz}/agencias` )
@ApiUseTags( 'Agencias' )
export class BDAgenciaController {
    constructor( private readonly Service: AgenciaService ) { }


    @Get()
    @ApiOperation( {
        description: "Lista as agencias registradas. \nOrigem: banco de dados",
        title: "Agencias"
    } )
    @ApiResponse( { status: 302, description: "Agencias encontradas" } )
    @ApiResponse( { status: 404, description: "Agencias não encontradas" } )
    @ApiResponse( { status: 502, description: "Erro na busca" } )

    async getAgencias ( @Res() res ) {
        try {
            let agencias: Agencia[] = await this.Service.getAgencias();
            if ( agencias.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( agencias );
            } else {
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( "Nenhuma agencia encontrada na busca" )
            }
        } catch ( err ) {
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( err.message );
        }
    }

    @Get( '/contatos' )
    @ApiOperation( {
        description: "Lista os contatos que recebem logs do GTFS. \nOrigem: banco de dados",
        title: "Contatos"
    } )
    @ApiResponse( { status: 302, description: "Contatos encontrados" } )
    @ApiResponse( { status: 404, description: "Contatos não encontrados" } )
    @ApiResponse( { status: 502, description: "Erro na busca" } )

    async getContatos ( @Res() res ) {
        try {
            let contatos: Contato[] = await this.Service.getContatos();
            if ( contatos.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( contatos );
            } else {
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( "Nenhum contato encontrado na busca" )
            }
        } catch ( err ) {
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( err.message );
        }
    }

    @Get( '/feriados' )
    @ApiOperation( {
        description: "Lista os feriados previstos. \nOrigem: banco de dados",
        title: "Feriados"
    } )
    @ApiResponse( { status: 302, description: "Feriados encontrados" } )
    @ApiResponse( { status: 404, description: "Feriados não encontrados" } )
    @ApiResponse( { status: 502, description: "Erro na busca" } )

    async getFeriados ( @Res() res ) {
        try {
            let feriados: Feriado[] = await this.Service.getFeriados();
            if ( feriados.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( feriados );
            } else {
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( "Nenhum feriado encontrado na busca" )
            }
        } catch ( err ) {
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( err.message );
        }
    }


    @Get( '/feriados/validar/:ano/:mes/:dia' )
    @ApiOperation( {
        description: "Indica se a data consultada é um feriado registrado no banco auxiliar ou não.",
        title: "Consulta booleana de Feriados da agencia por data"
    } )
    @ApiResponse( { status: 200, description: "Consulta executada com sucesso." } )
    @ApiImplicitParam( {
        name: 'ano',
        description: 'porção da data referente ao ano. exemplo: 2018',
        required: true,
    } )
    @ApiImplicitParam( {
        name: 'mes',
        description: 'porção da data referente ao mês. exemplo: 12',
        required: true,
    } )
    @ApiImplicitParam( {
        name: 'dia',
        description: 'porção da data referente ao dia. exemplo: 25',
        required: true,
    } )
    async isFeriado ( @Res() res, @Param( 'ano' ) ano, @Param( 'mes' ) mes, @Param( 'dia' ) dia ) {
        let hoje = new Date( `${ano}/${mes}/${dia}` );
        let consulta;
        try {
            consulta = await this.Service.CheckFeriado( hoje );
            res
                .status( HttpStatus.OK )
                .send( consulta );
        }
        catch ( err ) {
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( err.message );
        }
    }



    @Get( '/tarifas' )
    @ApiOperation( {
        description: "Lista as tarifas. \nOrigem: banco de dados ",
        title: "Tarifas"
    } )
    @ApiResponse( { status: 302, description: "Tarifas encontradas" } )
    @ApiResponse( { status: 404, description: "Tarifas não encontradas" } )
    @ApiResponse( { status: 502, description: "Erro na busca" } )

    async getTarifas ( @Res() res ) {
        try {
            let tarifas: Tarifa[] = await this.Service.getTarifas();
            if ( tarifas.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( tarifas );
            } else {
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( "Nenhuma tarifa encontrada na busca" )
            }
        } catch ( err ) {
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( err.message );
        }
    }

}
