import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as request from 'request-promise';

@Injectable()
export class ViagensService {
    private readonly url: string = "https://gvbus.geocontrol.com.br/pontual-api-web/listarViagens";

    public async retornar_viagens () {
        return request.get( this.url, { json: true } );

    }
}

