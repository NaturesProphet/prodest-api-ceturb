import { Controller, Get, Res, NotFoundException, HttpCode, Body, HttpService, HttpStatus } from '@nestjs/common';
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

    @Get( '*' )
    @ApiOperation( { title: 'rota para endpoints inexistentes (404)' } )
    @ApiResponse( { status: 404, description: 'Nao tem nada para ser visto aqui' } )
    public async noGetRoutes ( @Res() res ) {
        res.status( HttpStatus.NOT_FOUND )
            .send( "<html><body>404<br><img src = 'https://okpotatodotcom.files.wordpress.com/2014/12/gandalf-lost.gif'></html></body>" );
    }

}
