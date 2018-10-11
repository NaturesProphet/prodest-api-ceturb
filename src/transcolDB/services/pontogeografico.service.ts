import { Injectable } from '@nestjs/common';
import { PontoGeografico } from '../models/PontoGeografico.model';

@Injectable()
export class PontogeograficoService {

    async getPontogeograficos () {
        let pontogeograficos: PontoGeografico[];
        try {
            pontogeograficos = await PontoGeografico.find();
            return pontogeograficos;
        } catch ( err ) {
            throw new Error( `Erro ao buscar os pontos geográficos\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }
    }
}
