import { Injectable } from '@nestjs/common';
import { Estimativa } from '../models/Estimativa.model';

@Injectable()
export class EstimativaService {

    async getEstimativas () {
        let estimativas: Estimativa[];
        try {
            estimativas = await Estimativa.find();
            return estimativas;
        } catch ( err ) {
            throw new Error( `Erro ao buscar estimativas\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }
    }
}
