import { Injectable } from '@nestjs/common';
import { Agencia } from '../models/Agencia.model';
import { Feriado } from '../models/Feriado.model';
import { Contato } from '../models/Contato.model';
import { Tarifa } from '../models/Tarifa.model';

@Injectable()
export class AgenciaService {

    async getAgencias () {
        let agencias: Agencia[];
        try {
            agencias = await Agencia.find();
            return agencias;
        } catch ( err ) {
            throw new Error( `Erro ao buscar agencias\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }
    }

    async getFeriados () {
        let feriados: Feriado[];
        try {
            feriados = await Feriado.find();
            return feriados;
        } catch ( err ) {
            throw new Error( `Erro ao buscar feriados\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }

    }

    async getContatos () {
        let contatos: Contato[];
        try {
            contatos = await Contato.find();
            return contatos;
        } catch ( err ) {
            throw new Error( `Erro ao buscar contatos\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }
    }

    async getTarifas () {
        let tarifas: Tarifa[];
        try {
            tarifas = await Tarifa.find();
            return tarifas;
        } catch ( err ) {
            throw new Error( `Erro ao buscar tarifas\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }
    }
}
