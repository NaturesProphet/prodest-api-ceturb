import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { FeriadoService } from '../services/feriado.service';
import { ApiOperation, ApiResponse, ApiImplicitParam, ApiUseTags } from '@nestjs/swagger';

@Controller( 'transcoldb/feriado' )
@ApiUseTags( 'Feriados@TranscolDB' )
export class FeriadoController {
    constructor( private readonly Service: FeriadoService ) { }


    @Get()
    @ApiOperation( {
        description: "Lista TODOS os feriados registrados no banco de dados auxiliar",
        title: "Consulta feriados noem @TranscolDB"
    } )
    @ApiResponse( { status: 302, description: "Feriados encontrados" } )
    @ApiResponse( { status: 404, description: "Feriados não encontrados" } )
    async getAll ( @Res() res ) {
        try {
            let feriados = await this.Service.getAll();
            if ( feriados.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( feriados );
            } else {
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( "Nenhum feriado encontrado na busca" )
            }
        }
        catch ( err ) {
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( err.message );
        }
    }


    @Get( '/:ano/:mes/:dia' )
    @ApiOperation( {
        description: "Indica se a data consultada é um feriado registrado no banco auxiliar ou não.",
        title: "Consulta Feriados Boolean em @TranscolDB"
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
}
