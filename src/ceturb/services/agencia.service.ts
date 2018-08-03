import { Injectable, HttpService, Res, Body } from '@nestjs/common';
var request = require( 'request' );
import { Agencia } from '../models/agencia.model.Dto';

@Injectable()
export class AgenciasService {


    listar_agencias () {
        let agencias = [];
        agencias.push( new Agencia() );
        return agencias;
    }
}
