import { Injectable } from '@nestjs/common';
import * as request from 'request-promise';

@Injectable()
export class HorariosService {
    private readonly urlHorario: string = "http://api.ceturb.es.gov.br/onibus/api/BuscaHorarios";
    private readonly urlObservacao: string = "http://api.ceturb.es.gov.br/onibus/api/BuscaHorarioObse";

    public async lista_horario(linha: string) {
        let newUrl = this.urlHorario+'/'+linha;
        return await request.get( newUrl, { json: true } );
    }

    public async lista_horarioObs(linha: string) {
        let newUrl = this.urlObservacao+'/'+linha
        return await request.get( newUrl, { json: true } );
    }
}

