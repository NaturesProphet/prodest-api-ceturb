import { Injectable } from '@nestjs/common';

@Injectable()
export class AreaService {
    async BuscaPontosPorArea ( envelope: number[] ) {
        var obj = {
            "pontosDeParada": [ 726, 727, 742, 743 ] // Array contendo os ids dos pontos de parada 
        }
        return obj;
    }
}

