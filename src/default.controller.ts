import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Endpoints } from './commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;

@Controller()
@ApiUseTags( 'Documentação da API' )
export class DefaultController {

    @Get( raiz )
    @ApiOperation( {
        description: "Just a wellcome message.",
        title: "Hello Developers!"
    } )
    @ApiResponse( { status: 200, description: "Welcome message" } )
    async default ( @Res() res ) {
        res.send( "Bem vindo a nova API-CETURB desenvolvida pela parceria PRODEST, IFES e FAPES. Acesse a rota /docs e de uma olhada na nossa documentação. Happy Coding! :)" );
    }
}
