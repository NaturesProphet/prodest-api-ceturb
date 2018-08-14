import { Injectable } from '@nestjs/common';

@Injectable()
export class HorariosService {

    public async lista_horario ( linha: string ) {
        let obj1 = {
            "Linha": '0500',
            "Hora_Saida": "05:05",
            "Terminal_Seq": 1,
            "TP_Horario": 1,
            "Descricao_Hora": "DIAS ÚTEIS",
            "Descricao_Linha": "T. VILA VELHA / T. ITACIBÁ VIA 3ª PONTE",
            "Desc_Terminal": "TERMINAL VILA VELHA",
            "Tipo_Orientacao": " ",
            "Dt_Inicio": "21/08/2016"
        }

        let obj2 = {
            "Linha": '0500',
            "Hora_Saida": "05:20",
            "Terminal_Seq": 1,
            "TP_Horario": 1,
            "Descricao_Hora": "DIAS ÚTEIS",
            "Descricao_Linha": "T. VILA VELHA / T. ITACIBÁ VIA 3ª PONTE",
            "Desc_Terminal": "TERMINAL VILA VELHA",
            "Tipo_Orientacao": " ",
            "Dt_Inicio": "21/08/2016"
        }

        let obj3 = {
            "Linha": '0500',
            "Hora_Saida": "05:35",
            "Terminal_Seq": 1,
            "TP_Horario": 1,
            "Descricao_Hora": "DIAS ÚTEIS",
            "Descricao_Linha": "T. VILA VELHA / T. ITACIBÁ VIA 3ª PONTE",
            "Desc_Terminal": "TERMINAL VILA VELHA",
            "Tipo_Orientacao": " ",
            "Dt_Inicio": "21/08/2016"
        }

        return [ obj1, obj2, obj3 ];
    }

    public async lista_horarioObs(linha: string) {
        return [ { "teste": "teste" }, { "teste": "teste" },{ "teste": "teste" }]
    }
}
