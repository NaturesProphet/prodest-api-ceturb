import { Injectable } from '@nestjs/common';
import { Viagem } from '../../models/Viagem.model';

@Injectable()
export class ViagemService {

    async getViagems () {
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
