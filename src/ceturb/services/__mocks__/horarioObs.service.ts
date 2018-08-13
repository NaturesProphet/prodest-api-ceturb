import { Injectable, HttpService, Res } from '@nestjs/common';

@Injectable()
export class HorariosObsService {

    public async lista_horarioObs ( linha: string ) {
        let obj1 = {
            "Tipo_Orientacao": "K",
            "Descricao_Orientacao": "PART.SHOP. P.COSTA INDO ATÉ T.GRANDE VIA B.MAR 2ªA5ª,6ª CUMPRI 23:10"
        }
        let obj2 = {
            "Tipo_Orientacao": "S",
            "Descricao_Orientacao": " HORÁRIO VIA SHOPPING VITÓRIA"
        }

        return [ obj1, obj2 ];
    }
}
