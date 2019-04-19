import { Controller, Get, Res } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { rootEndPoint as raiz } from './commom/configs/endpoints.config';

@Controller()
@ApiUseTags( 'raiz' )
export class DefaultController {

    @Get( raiz )
    @ApiOperation( {
        description: "Mensagem de boas vindas",
        title: "Hello World!"
    } )
    @ApiResponse( {
        status: 200,
        description: "Welcome message",
        type: 'string'
    } )
    async default ( @Res() res ) {
        res.send( "Bem vindo(a) a nova API-CETURB desenvolvida pela parceria PRODEST, IFES e FAPES. Acesse o link https://api.es.gov.br/transcol/docs/ e de uma olhada na nossa documentação mais recente. Happy Coding! :)" );
    }
}
