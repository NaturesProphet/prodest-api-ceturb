import { Injectable } from '@nestjs/common';
import { Feriado } from '../models/Feriado.model';
import { FeriadoResponse } from '../models/Dto/FeriadoResponse.dto';

@Injectable()
export class FeriadoService {

    /**
     * Método que verifica se uma data consultada é um feriado.
     * @param d objeto Date contendo a data a ser pesquisada
     * @returns retorna um objeto FeriadoResponse com a data pesquisada e um booleano informando se é um feriado
     */
    async CheckFeriado ( d: Date ) {
        let resposta = new FeriadoResponse();
        resposta.dia = d;
        let hoje: Feriado;

        try {
            hoje = await Feriado.findOne( { where: { data: d } } );
        } catch ( err ) {
            throw new Error( `Falha na consulta de feriados: ${err.message}` );
        }

        if ( hoje == undefined ) {
            resposta.feriado = false;
        } else {
            resposta.feriado = true;
        }
        return resposta;
    }

    /**
     * Método que lista todos os feriados registrados no banco
     * @returns Array de Feriado contendo a lista de todos os feriados
     */
    async getAll () {
        let feriados: Feriado[];
        try {
            feriados = await Feriado.find();
        }
        catch ( err ) {
            throw new Error( `Erro ao consultar os feriados. ${err.message}` );
        }
        return feriados;
    }
}
