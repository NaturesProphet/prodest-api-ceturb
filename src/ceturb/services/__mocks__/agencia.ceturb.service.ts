import { Injectable } from '@nestjs/common';
var agencias = require( "../../models/dto/ceturb.json" );

@Injectable()
export class AgenciasService {

    async listar_agencias () {
        return [
            {
                "agency_id": 1,
                "agency_name": "CETURB/ES",
                "agency_timezone": "America/Sao_Paulo",
                "agency_url": "https://ceturb.es.gov.br/",
                "agency_lang": "pt",
                "agency_phone": "+55 27 3232 4500"
            }
        ];
    }
}
