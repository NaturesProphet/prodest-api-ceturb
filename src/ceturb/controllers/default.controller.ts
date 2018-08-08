import { Controller, Get, Res, NotFoundException, HttpCode, Body, HttpService } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CeturbUtils } from '../services/CeturbUtils'
import { request } from 'https';

@Controller()
@ApiUseTags( 'Estamos Vivos!' )
export class DefaultController {

    @Get( "/" )
    @ApiOperation( {
        description: "Retorna uma mensagem de estado de saude da API dO_Ob",
        title: "Pocando!"
    } )
    @ApiResponse( { status: 200, description: "Retorna mensagem 'Pocando!'" } )
    async default () {
        return "Pocando!";
    }

    @Get( '/teste' )
    async getBodyTest () {
        return CeturbUtils.getBody( 'https://gvbus.geocontrol.com.br/pontual-api-web/listarLinhas' );
    }

    @Get( '*' )
    @ApiOperation( { title: 'rota para endpoints inexistentes (404)' } )
    @ApiResponse( { status: 404, description: 'Nao tem nada para ser visto aqui' } )
    public async noGetRoutes () {
        return "<html><body>404<br><img src = 'https://okpotatodotcom.files.wordpress.com/2014/12/gandalf-lost.gif'></html></body>"
    }

}
