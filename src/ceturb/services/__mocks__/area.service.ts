import { Injectable } from '@nestjs/common';
import { Envelope } from '../../models/envelope.Dto';

@Injectable()
export class AreaService {
    async BuscaPontosPorArea ( body: Envelope ) {
        var obj = {
            "pontosDeParada": [ 726, 727, 742, 743 ] // Array contendo os ids dos pontos de parada 
        }
        return obj;
    }
}

