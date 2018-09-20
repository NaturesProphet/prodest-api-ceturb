import { Injectable, Param } from '@nestjs/common';
import * as request from 'request-promise';
import { OrigemEDestino } from '../models/origemEDestino.Dto';
import { OrigemELinha } from '../models/origemELinha.Dto';

@Injectable()
export class EstimativasService {
    private readonly url = 'https://buscabus.geocontrol.com.br/svc/estimativas';

    /**
     * Método que busca estimativas por ponto de origem na API da geocontrol
     * @param id id do ponto de origem
     */
    async ObterPorOrigem ( Params ) {
        const options = {
            method: 'POST',
            uri: `${this.url}/obterEstimativasPorOrigem`,
            body: { pontoDeOrigemId: parseInt( Params.id ) },
            json: true
        };
        return request( options );
    }




    /**
     * Método que busca estimativas por pontos de origem e destino na API da geocontrol
     * @param body corpo da requisição contendo ids do ponto de origem e destino
     */
    async ObterPorOrigemEDestino ( @Param() params ) {
        const options = {
            method: 'POST',
            uri: `${this.url}/obterEstimativasPorOrigemEDestino`,
            body: {
                pontoDeOrigemId: parseInt( params.id_origem ),
                pontoDeDestinoId: parseInt( params.id_destino )
            },
            json: true
        };
        return request( options );
    }



    /**
         * Método que busca estimativas por pontos de origem e destino na API da geocontrol
         * @param body corpo da requisição contendo ids do ponto de origem e destino
         */
    async ObterPorOrigemELinha ( body: OrigemELinha ) {
        console.log( body )
        const options = {
            method: 'POST',
            uri: `${this.url}/obterEstimativasPorOrigemELinha`,
            body: body,
            json: true
        };
        return request( options );
    }

}
