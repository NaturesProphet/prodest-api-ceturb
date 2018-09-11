import { Injectable } from '@nestjs/common';
var calendario = require( "../../models/dto/calendario.json" );

@Injectable()
export class CalendarioService {
    async listar_calendario () {
        return calendario;
    }
}
