import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
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
    public async listar ( @Res() res ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.service.listAll() );
        } catch ( err ) {
            res.status( HttpStatus.NO_CONTENT )
                .send( new InformationNotFound( "Gtfs Não Encontrado" ) );
        }
    }
}
