import { Injectable } from '@nestjs/common';
import { Estimativa } from '../../models/Estimativa.model';

@Injectable()
export class EstimativaService {

    async getEstimativas () {
        let resposta: Estimativa[] = new Array();
        let entidade: Estimativa = new Estimativa();

        entidade.id = 1;
        entidade.ponto_id = 1;
        entidade.viagem_id = 1;
        entidade.id = 1;
        entidade.datadecoleta = '2018-10-10';


        resposta.push( entidade );
        return resposta;
    }
}
