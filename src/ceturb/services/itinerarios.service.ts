import { Injectable } from '@nestjs/common';
import * as request from 'request-promise';

@Injectable()
export class ItinerariosService {
    private readonly urlGeoControl: string = "https://gvbus.geocontrol.com.br/pontual-api-web/listarItinerarios";
    private readonly urlCeturb: string = "http://api.ceturb.es.gov.br/onibus/api/BuscaItinerarios";

    public async lista_itinerario () {
        return request.get( this.urlGeoControl, { json: true } );
    }

    public async busca_itinerario ( linha: number ) {
        let newUrl = this.urlCeturb + '/' + linha;
        return request.get( newUrl, { json: true } );
    }
}

