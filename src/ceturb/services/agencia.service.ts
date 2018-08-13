import { Injectable } from '@nestjs/common';
import { InformationNotFound } from '../models/exception/InformationNotFound';
var agencia = require( "../models/dto/ceturb.json" );

@Injectable()
export class AgenciasService {

    async listar_agencias () {

        return agencia;
    }
}
