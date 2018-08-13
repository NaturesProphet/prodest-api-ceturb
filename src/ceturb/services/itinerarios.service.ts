import { Injectable, HttpService, Res, HttpException, HttpStatus } from '@nestjs/common';
import * as request from 'request-promise';

@Injectable()
export class ItinerariosService {
    private readonly url: string = "https://gvbus.geocontrol.com.br/pontual-api-web/listarItinerarios";

    public async lista_itinerario () {
        try {
            return await request.get( this.url, { json: true } );
        } catch ( err ) {
            throw new HttpException( 'Erro', HttpStatus.GATEWAY_TIMEOUT );
        }
    }
}

