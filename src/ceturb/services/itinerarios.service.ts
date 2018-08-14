import { Injectable } from '@nestjs/common';
import * as request from 'request-promise';

@Injectable()
export class ItinerariosService {
    private readonly urlGeoControl: string = "https://gvbus.geocontrol.com.br/pontual-api-web/listarItinerarios";
    private readonly urlCeturb: string = "http://api.ceturb.es.gov.br/onibus/api/BuscaItinerarios";

    public async lista_itinerario () {
        return await request.get( this.urlGeoControl, { json: true } );
    }

    public async busca_itinerario ( linha: string ) {
        let newUrl = this.urlCeturb + '/' + linha;
        return await request.get( newUrl, { json: true } );
    }
}

