import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
@ApiUseTags( 'Estamos Vivos!' )
export class DefaultController {

    @Get( "/" )
    @ApiOperation( {
        description: "Redireciona para a pagina Swagger da API dO_Ob",
        title: "Swagger"
    } )
    @ApiResponse( { status: 200, description: "redireciona para a rota do swagger" } )
    async default ( @Res() res ) {
        res.redirect( '/docs/' );
    }
}
