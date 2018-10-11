import { Injectable } from '@nestjs/common';
import { Linha } from '../models/Linha.model';

@Injectable()
export class LinhaService {

    async getLinhas () {
        let linhas: Linha[];
        try {
            linhas = await Linha.find();
            return linhas;
        } catch ( err ) {
            throw new Error( `Erro ao buscar linhas\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }
    }
}
