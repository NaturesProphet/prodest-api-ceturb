import { Injectable, HttpService, Res, HttpException, HttpStatus } from '@nestjs/common';
import * as request from 'request-promise';

@Injectable()
export class HorariosService {
    private readonly url: string = "http://api.ceturb.des.es.gov.br/onibus/api/BuscaHorarios";

    public async lista_horario ( linha: string ) {
        try {
            let newUrl = this.url + '/' + linha;
            return await request.get( newUrl, { json: true } );
        } catch ( err ) {
            throw new HttpException( 'Erro', HttpStatus.GATEWAY_TIMEOUT );
        }
    }
}

