import { Injectable } from '@nestjs/common';
import { Itinerario } from '../../models/Itinerario.model';
import { Viagem } from '../../models/Viagem.model';

@Injectable()
export class ItinerarioService {

    async getItinerarios () {
        let resposta: Itinerario[] = new Array();
        let entidade: Itinerario = new Itinerario();

        entidade.id = 1;
        entidade.id_geocontrol = 1;
        entidade.codigo = '123';
        entidade.bandeira = 'caçaroca';
        entidade.linha_id = 69;

        resposta.push( entidade );
        return resposta;
    }

    async getItinerariosByCodigo ( cod: string ) {
        let resposta: Itinerario[] = new Array();
        let entidade: Itinerario = new Itinerario();

        entidade.id = 1;
        entidade.id_geocontrol = 1;
        entidade.codigo = cod;
        entidade.bandeira = 'caçaroca';
        entidade.linha_id = 69;

        resposta.push( entidade );
        return resposta;
    }

    async getViagemByItinerarioCode ( cod: string ) {
        let viagems: Viagem[] = new Array();
        let viagem = new Viagem();
        viagem.id = 1;
        viagem.itinerario_id = 1;
        viagem.horadasaida = '00:00:00';
        viagem.horadachegada = '00:00:00';
        viagem.domingo = false;
        viagem.sabado = false;
        viagem.diautil = true;
        viagem.acessibilidade = true;
        viagem.veiculo = '00000';
        viagems.push( viagem );
        return viagems;
    }
}
