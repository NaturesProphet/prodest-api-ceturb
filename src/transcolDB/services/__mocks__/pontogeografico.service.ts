import { Injectable } from '@nestjs/common';
import { PontoGeografico } from '../../models/PontoGeografico.model';

@Injectable()
export class PontogeograficoService {

    async getPontogeograficos () {
        let resposta: PontoGeografico[] = new Array();
        let entidade: PontoGeografico = new PontoGeografico();

        entidade.altitude = '40';
        entidade.id = 1;
        entidade.itinerario_id = 1;
        entidade.latitude = '-40.3452334545';
        entidade.longitude = '-20.3425324532';
        entidade.sequencia = 1;


        resposta.push( entidade );
        return resposta;
    }
}
