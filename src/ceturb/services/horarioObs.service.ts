import { Injectable, HttpService, Res, Body } from '@nestjs/common';
import * as request from 'request-promise';

@Injectable()
export class HorariosObsService {
    private readonly url: string = "http://api.ceturb.des.es.gov.br/onibus/api/BuscaHorarioObse";

    public async lista_horarioObs(linha: string) {
        
        let newUrl = this.url+'/'+linha
        return await request.get( newUrl, { json: true } );
    }
}

