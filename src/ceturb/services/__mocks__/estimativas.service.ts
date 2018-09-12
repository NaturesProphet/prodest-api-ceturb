import { Injectable } from '@nestjs/common';
import { OrigemEDestino } from '../../models/origemEDestino.Dto';
import { OrigemELinha } from '../../models/origemELinha.Dto';
import { InformationNotFound } from '../../models/exception/InformationNotFound';

@Injectable()
export class EstimativasService {
    private readonly url = 'https://buscabus.geocontrol.com.br/svc/estimativas';

    /**
     * Método que busca estimativas por ponto de origem na API da geocontrol
     * @param id id do ponto de origem
     */
    async ObterPorOrigem ( Params ) {
        const resposta = {
            "horarioDoServidor": 1485282858181, // Horário do relógio no servidor no formato "millis"  
            "pontoDeOrigemId": 726, // Id do ponto de origem 
            "estimativas": [
                {
                    "veiculo": "14197", // Rótulo do identificador do ônibus cuja estimativa de passagem está sendo gerada 
                    "acessibilidade": false, // Boolean que informa se o ônibus está adaptado para o uso cadeirantes 
                    "itinerarioId": 1353, // Id do itinerário sendo realizado 
                    "horarioDePartida": 1485285120000, // Horário programado de início da viagem 
                    "horarioNaOrigem": 1485285591506, // Horário estimado de passagem do ônibus no ponto de origem 
                    "horarioDaTransmissao": 1485285120000 // Horário do pacote de rastreamento do ônibus 
                },
                {
                    "veiculo": "14132",
                    "acessibilidade": true,
                    "itinerarioId": 1353,
                    "horarioDePartida": 1485285840000,
                    "horarioNaOrigem": 1485286311506,
                    "horarioDaTransmissao": 1485285840000
                },
            ]
        }
        if ( Params.id != 0 ) {
            return resposta;
        } else {
            throw new InformationNotFound( "Não foram encontradas estimativas para o ponto" );
        }
    }




    /**
     * Método que busca estimativas por pontos de origem e destino na API da geocontrol
     * @param body corpo da requisição contendo ids do ponto de origem e destino
     */
    async ObterPorOrigemEDestino ( body: OrigemEDestino ) {
        const resposta = {
            "horarioDoServidor": 1485282858181, // Horário do relógio no servidor no formato "millis"  
            "pontoDeOrigemId": 452, // Id do ponto de origem 
            "pontoDeDestinoId": 452, // Id do ponto de destino 
            "estimativas": [
                {
                    "veiculo": "14197", // Rótulo do identificador do ônibus cuja estimativa de passagem está sendo gerada 
                    "acessibilidade": false, // Boolean que informa se o ônibus está adaptado para o uso cadeirantes 
                    "itinerarioId": 599, // Id do itinerário sendo realizado 
                    "horarioDePartida": 1485285120000, // Horário programado de início da viagem 
                    "horarioNaOrigem": 1485285591506, // Horário estimado de passagem do ônibus no ponto de origem 
                    "horarioNoDestino": 1485285064194, // Horário estimado de passagem do ônibus no ponto de destino 
                    "horarioDaTransmissao": 1485285120000 // Horário do pacote de rastreamento do ônibus 
                },
                {
                    "veiculo": "14132",
                    "acessibilidade": true,
                    "itinerarioId": 599,
                    "horarioDePartida": 1485285840000,
                    "horarioNaOrigem": 1485286311506,
                    "horarioNoDestino": 1485285064194,
                    "horarioDaTransmissao": 1485285840000
                },
            ]
        }
        if ( body.pontoDeDestinoId != 0 && body.pontoDeOrigemId != 0 )
            return resposta;
        else throw new InformationNotFound( "Não foram encontradas estimativas para o ponto" );
    }


    /**
         * Método que busca estimativas por pontos de origem e destino na API da geocontrol
         * @param body corpo da requisição contendo ids do ponto de origem e destino
         */
    async ObterPorOrigemELinha ( body: OrigemELinha ) {
        const resposta = {
            "horarioDoServidor": 1485282858181, // Horário do relógio no servidor no formato "millis"  
            "pontoDeOrigemId": 452, // Id do ponto de origem 
            "linhaId": 669, // Id da linha 
            "estimativas": [
                {
                    "veiculo": "14197", // Rótulo do identificador do ônibus cuja estimativa de passagem está sendo gerada 
                    "acessibilidade": false, // Boolean que informa se o ônibus está adaptado para o uso cadeirantes 
                    "itinerarioId": 599, // Id do itinerário sendo realizado 
                    "horarioDePartida": 1485285120000, // Horário programado de início da viagem 
                    "horarioNaOrigem": 1485285591506, // Horário estimado de passagem do ônibus no ponto de origem 
                    "horarioDaTransmissao": 1485285120000 // Horário do pacote de rastreamento do ônibus 
                },
                {
                    "veiculo": "14132",
                    "acessibilidade": true,
                    "itinerarioId": 599,
                    "horarioDePartida": 1485285840000,
                    "horarioNaOrigem": 1485286311506,
                    "horarioDaTransmissao": 1485285840000
                },
            ]
        }
        return resposta;
    }
}
