import { Injectable } from '@nestjs/common';
import { Ponto } from '../../models/Ponto.model';
import { Viagem } from '../../models/Viagem.model';

@Injectable()
export class PontoService {

    async getPontos () {
        let resposta: Ponto[] = new Array();
        let entidade: Ponto = new Ponto();

        entidade.id = 1;
        entidade.id_geocontrol = 1;
        entidade.codigo = '123';
        entidade.azimute = 10;
        entidade.latitude = '-40.51435234535';
        entidade.longitude = '-20.32w3623456';
        entidade.logradouro = 'rua dos Javeiros';
        entidade.municipio = 'bairro dos stack overflows';
        entidade.referencia = 'ao lado do supermercado e-buy';
        entidade.terminal = false;


        resposta.push( entidade );
        return resposta;
    }


    async getEstimativas ( codigo_ponto: string ) {
        let resposta: Viagem[] = new Array();
        let entidade: Viagem = new Viagem();
        entidade.acessibilidade = true;
        entidade.diautil = true;
        entidade.domingo = false;
        entidade.horadachegada = '00:00:00';
        entidade.horadasaida = '00:00:00';
        entidade.id = 10;
        entidade.itinerario_id = 1;
        entidade.sabado = false;

        resposta.push( entidade );
        return resposta;
    }

}
