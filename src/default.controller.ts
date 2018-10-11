import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
@ApiUseTags( 'Estamos Vivos!' )
export class DefaultController {

    @Get( "/" )
    @ApiOperation( {
        description: "Retorna uma mensagem de estado de saude da API dO_Ob",
        title: "Pocando!"
    } )
    @ApiResponse( { status: 200, description: "Retorna mensagem 'Pocando!'" } )
    async default ( @Res() res ) {
        res
            .status( HttpStatus.OK )
            .send( "Pocando!" );
    }
}
