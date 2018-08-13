import { Injectable } from '@nestjs/common';

@Injectable()
export class LinhasService {

    public async retornar_linhas () {

        let obj1 = {
            "id": 716,
            "codigo": 400,
            "descricao": "VILA VELHA / PRAIA SANTA HELENA"
        }

        let obj2 = {
            "id": 552,
            "codigo": 500,
            "descricao": "T. VILA VELHA / T. ITACIBÁ"
        }

        let obj3 = {
            "id": 544,
            "codigo": 501,
            "descricao": "T. JACARAIPE / T. ITAPARICA  "
        }

        return [ obj1, obj2, obj3 ];
    }
}
