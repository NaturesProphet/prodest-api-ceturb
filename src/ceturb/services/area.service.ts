import { Injectable, Param } from '@nestjs/common';
import * as request from 'request-promise';


@Injectable()
export class AreaService {
    private readonly url = 'https://buscabus.geocontrol.com.br/svc/json/db/pesquisarPontosDeParada';
    /**
    * Método que busca pontos dentro de uma area do mapa na API da geocontrol,
    * O formato da requisição deve estar da seguinte maneira:
        {
        "envelope": [­40.309548147161195,­20.282983882640348,­40.29407716556429,­20.274791927077008]
        // Array de double com 4 posições (left, top, right, bottom) representando as 
        // coordenadas do retângulo dentro do qual devem estar os pontos de parada          
        }
    * @param body corpo da requisição contendo as coordenadas
    */
    async BuscaPontosPorArea ( coordenadas: number[] ) {
        const options = {
            method: 'POST',
            uri: this.url,
            body: {
                envelope: coordenadas
            },
            json: true
        };
        return request( options );
    }
}

