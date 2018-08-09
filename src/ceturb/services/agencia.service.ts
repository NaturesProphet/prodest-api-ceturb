import { Injectable } from '@nestjs/common';
import { Agencia } from '../models/agencia.model.Dto';

@Injectable()
export class AgenciasService {

    listar_agencias () {
        let agencias = [];
        agencias.push( new Agencia() );
        return agencias;
    }
}
