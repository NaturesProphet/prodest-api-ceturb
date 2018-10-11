import { Injectable } from '@nestjs/common';
import { Agencia } from '../../models/Agencia.model';
import { Contato } from '../../models/Contato.model';
import { Feriado } from '../../models/Feriado.model';
import { Tarifa } from '../../models/Tarifa.model';

@Injectable()
export class AgenciaService {

    async getAgencias () {
        let resposta: Agencia[] = new Array();
        let entidade: Agencia = new Agencia();

        entidade.id = 1;
        entidade.nome = 'CETURB/GV';
        entidade.telefone = '0800';

        resposta.push( entidade );
        return resposta;
    }

    async getContatos () {
        let resposta: Contato[] = new Array();
        let entidade: Contato = new Contato();

        entidade.id = 1;
        entidade.agencia_id = 1;
        entidade.ativo = true;
        entidade.email = 'asd@asd.asd';
        entidade.nome = 'Jocicreide da Silva';


        resposta.push( entidade );
        return resposta;

    }

    async getFeriados () {
        let resposta: Feriado[] = new Array();
        let entidade: Feriado = new Feriado();

        entidade.id = 1;
        entidade.data = new Date( '2018-12-25' );
        entidade.nome = 'natal';
        entidade.agencia_id = 1;


        resposta.push( entidade );
        return resposta;

    }

    async getTarifas () {
        let resposta: Tarifa[] = new Array();
        let entidade: Tarifa = new Tarifa();

        entidade.agencia_id = 1;
        entidade.id = 1;
        entidade.preco = 3.75;


        resposta.push( entidade );
        return resposta;
    }
}
