import { Injectable } from '@nestjs/common';
import { Ponto } from '../models/Ponto.model';
import { Estimativa } from '../models/Estimativa.model';

@Injectable()
export class PontoService {

    async getPontos () {
        let pontos: Ponto[];
        try {
            pontos = await Ponto.find();
            return pontos;
        } catch ( err ) {
            throw new Error( `Erro ao buscar pontos\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }
    }


    async getEstimativas ( codigo_ponto: string ) {
        let estimativas: Estimativa[];
        let ponto: Ponto;
        try {
            ponto = await Ponto.findOne( { where: { codigo: codigo_ponto } } );
            if ( ponto == undefined ) return [];
        } catch ( err ) {
            throw new Error( `Erro ao buscar o ponto\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }
        try {
            estimativas = await Estimativa.find( { where: { ponto_id: ponto.id } } );
            return estimativas;
        } catch ( err ) {
            throw new Error( `Erro ao buscar viagems\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }
    }
}
