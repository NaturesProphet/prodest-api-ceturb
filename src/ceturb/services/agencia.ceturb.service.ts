import { Injectable } from '@nestjs/common';
var agencia = require( "../models/dto/ceturb.json" );

@Injectable()
export class AgenciasService {

    async listar_agencias () {

        return agencia;
    }
}
