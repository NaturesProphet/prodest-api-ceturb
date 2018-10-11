import { Injectable } from '@nestjs/common';
import { Viagem } from '../models/Viagem.model';

@Injectable()
export class ViagemService {

    async getViagems () {
        let viagems: Viagem[];
        try {
            viagems = await Viagem.find();
            return viagems;
        } catch ( err ) {
            throw new Error( `Erro ao buscar viagems\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }
    }
}
