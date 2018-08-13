import { Injectable, HttpService, Res } from '@nestjs/common';

@Injectable()
export class ItinerariosService {

    public async lista_itinerario () {
        return [ { "teste": "teste" }, { "teste": "teste" }, ]
    }

    public async busca_itinerario () {
        return [ { "teste": "teste" }, { "teste": "teste" }, ]
    }
}

