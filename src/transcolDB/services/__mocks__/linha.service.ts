import { Injectable } from '@nestjs/common';
import { Linha } from '../../models/Linha.model';

@Injectable()
export class LinhaService {

    async getLinhas () {
        let resposta: Linha[] = new Array();
        let entidade: Linha = new Linha();

        entidade.id = 1;
        entidade.id_geocontrol = 1;
        entidade.codigo = '123';
        entidade.descricao = 'Linha mockada da poha bicho!'
        entidade.diautil = true;
        entidade.domingo = false;
        entidade.sabado = false;


        resposta.push( entidade );
        return resposta;
    }
}
