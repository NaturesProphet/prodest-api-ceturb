import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Endpoints } from './commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;

@Controller()
@ApiUseTags( 'Documentação da API' )
export class DefaultController {

    @Get( raiz )
    @ApiOperation( {
        description: "Redireciona para a pagina Swagger da API dO_Ob",
        title: "Swagger"
    } )
    @ApiResponse( { status: 200, description: "redireciona para a rota do swagger" } )
    async default ( @Res() res ) {
        res.redirect( `${raiz}/docs/` );
    }
}
