import { Injectable, HttpService, Res, Body, HttpException, HttpStatus } from '@nestjs/common';
import * as request from 'request-promise';

@Injectable()
export class HorariosObsService {
    private readonly url: string = "http://api.ceturb.des.es.gov.br/onibus/api/BuscaHorarioObse";

    public async lista_horarioObs ( linha: string ) {
        try {
            let newUrl = this.url + '/' + linha
            return await request.get( newUrl, { json: true } );
        } catch ( err ) {
            throw new HttpException( 'Erro', HttpStatus.GATEWAY_TIMEOUT );
        }
    }
}

