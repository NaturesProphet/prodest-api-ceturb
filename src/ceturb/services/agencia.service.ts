import { Injectable } from '@nestjs/common';
import { InformationNotFound } from '../models/exception/InformationNotFound';
var agencias = require( "../models/dto/ceturb.json" );

@Injectable()
export class AgenciasService {

    async listar_agencias () {
        try {
            return agencias;
        } catch ( err ) {
            throw ( InformationNotFound );
        }
    }
}
