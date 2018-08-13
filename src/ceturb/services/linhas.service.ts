import { Injectable, HttpService, Res, Body, HttpException, HttpStatus } from '@nestjs/common';
import * as request from 'request-promise';

@Injectable()
export class LinhasService {
    private readonly url: string = "https://gvbus.geocontrol.com.br/pontual-api-web/listarLinhas";

    public async retornar_linhas () {
        try {
            return await request.get( this.url, { json: true } );
        } catch ( err ) {
            throw new HttpException( 'Erro', HttpStatus.GATEWAY_TIMEOUT );
        }
    }
}

