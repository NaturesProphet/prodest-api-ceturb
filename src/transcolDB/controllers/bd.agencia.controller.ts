import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { AgenciaService } from '../services/agencia.service';
import { Agencia } from '../models/Agencia.model';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Contato } from '../models/Contato.model';
import { Feriado } from '../models/Feriado.model';
import { Tarifa } from '../models/Tarifa.model';

@Controller( 'transcoldb/agencia' )
@ApiUseTags( 'Agencias@TranscolDB' )
export class BDAgenciaController {
    constructor( private readonly Service: AgenciaService ) { }


    @Get()
    @ApiOperation( {
        description: "Listar agencias registradas no banco auxiliar",
        title: "Agencias em @TranscolDB"
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

    @Get( '/contato' )
    @ApiOperation( {
        description: "Listar contatos registrados no banco auxiliar",
        title: "Contatos em @TranscolDB"
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

    @Get( '/feriado' )
    @ApiOperation( {
        description: "Listar feriados registrados no banco auxiliar",
        title: "Feriados em @TranscolDB"
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


    @Get( '/tarifa' )
    @ApiOperation( {
        description: "Listar tarifas registradas no banco auxiliar",
        title: "Tarifas em @TranscolDB"
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
