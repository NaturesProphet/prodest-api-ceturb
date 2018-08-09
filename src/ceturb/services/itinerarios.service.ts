import { Injectable, HttpService, Res } from '@nestjs/common';
import * as request from 'request-promise';

@Injectable()
export class ItinerariosService {
    private readonly url: string = "https://gvbus.geocontrol.com.br/pontual-api-web/listarItinerarios";

    public async lista_itinerario () {
        return await request.get( this.url, { json: true } );
    }
}

