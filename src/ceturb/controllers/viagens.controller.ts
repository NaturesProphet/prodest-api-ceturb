import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { ViagensService } from '../services/viagens.service';
import { InformationNotFound } from '../models/exception/InformationNotFound';


@Controller( 'viagens' )
@ApiUseTags( "Viagens" )
export class ViagensController {
    constructor( private readonly service: ViagensService ) { }

    @Get()
    @ApiOperation( { title: 'lista as viagens existentes' } )
    @ApiResponse( { status: 200, description: 'Viagens encontradas' } )
    @ApiResponse( { status: 204, description: 'Viagens não encontradas.' } )
    public async lista_viagens ( @Res() res ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.service.retornar_viagens() );
        } catch ( err ) {
            res
                .status( HttpStatus.NO_CONTENT )
                .send( new InformationNotFound( "Não há registros" ) );
        }
    }

    @Get( '7dias' )
    @ApiOperation( { title: 'lista as viagens existentes para os próximos 7 dias' } )
    @ApiResponse( { status: 200, description: 'Viagens encontradas' } )
    @ApiResponse( { status: 204, description: 'Viagens não encontradas.' } )
    public async lista_viagens_7dias ( @Res() res ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.service.retornar_viagens_7dias() );
        } catch ( err ) {
            res
                .status( HttpStatus.NO_CONTENT )
                .send( new InformationNotFound( "Não há registros" ) );
        }
    }

}
