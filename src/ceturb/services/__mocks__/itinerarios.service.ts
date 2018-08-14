import { Injectable, HttpService, Res } from '@nestjs/common';

@Injectable()
export class ItinerariosService {

    public async lista_itinerario () {
        let obj1 = {
            "id": 1981,
            "codigo": "400I",
            "bandeira": "PRAIA DE SANTA HELENA",
            "linhaId": 716
        }

        let obj2 = {
            "id": 1982,
            "codigo": "400I_C",
            "bandeira": "PRAIA DE SANTA HELENA",
            "linhaId": 716
        }

        let obj3 = {
            "id": 1984,
            "codigo": "400V",
            "bandeira": "VILA VELHA",
            "linhaId": 716
        }

        return [ obj1, obj2, obj3 ];
    }

    public async busca_itinerario () {
        return [ { "teste": "teste" }, { "teste": "teste" }, ]
    }
}

