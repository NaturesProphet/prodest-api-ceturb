import { Injectable } from '@nestjs/common';
import * as request from 'request-promise';
import { Envelope } from '../models/envelope.Dto';

@Injectable()
export class AreaService {
    private readonly url = 'https://buscabus.geocontrol.com.br/svc/texto/pesquisarPontosDeParada';

    /**
    * Método que busca pontos dentro de uma area do mapa na API da geocontrol
    * @param body corpo da requisição contendo as coordenadas
    */
    async BuscaPontosPorArea ( body: Envelope ) {
        console.log( body )
        const options = {
            method: 'POST',
            uri: this.url,
            body: body,
            json: true
        };
        return request( options );
    }
}

