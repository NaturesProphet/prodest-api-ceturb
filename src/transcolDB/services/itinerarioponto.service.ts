import { Injectable } from '@nestjs/common';
import { ItinerarioPonto } from '../models/itinerario_ponto.model';

@Injectable()
export class ItinerariopontoService {

    async getItinerariopontos () {
        let itinerariopontos: ItinerarioPonto[];
        try {
            itinerariopontos = await ItinerarioPonto.find();
            return itinerariopontos;
        } catch ( err ) {
            throw new Error( `Erro ao buscar registros da tabela itinerario_ponto\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }
    }
}
