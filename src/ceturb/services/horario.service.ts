import { Injectable, HttpService, Res, HttpException, HttpStatus } from '@nestjs/common';
import * as request from 'request-promise';

@Injectable()
export class HorariosService {
    private readonly url: string = "http://api.ceturb.des.es.gov.br/onibus/api/BuscaHorarios";

    public async lista_horario ( linha: string ) {
        let newUrl = this.url + '/' + linha;
        return await request.get( newUrl, { json: true } );
    }
}

