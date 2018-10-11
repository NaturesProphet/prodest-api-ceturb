import { Injectable } from '@nestjs/common';
import { ItinerarioPonto } from '../../models/itinerario_ponto.model';

@Injectable()
export class ItinerariopontoService {

    async getItinerariopontos () {
        let resposta: ItinerarioPonto[] = new Array();
        let entidade: ItinerarioPonto = new ItinerarioPonto();

        entidade.itinerario_id = 1;
        entidade.ponto_id = 1;
        entidade.embarque = true;
        entidade.desembarque = false;
        entidade.ordem = 1;


        resposta.push( entidade );
        return resposta;
    }
}