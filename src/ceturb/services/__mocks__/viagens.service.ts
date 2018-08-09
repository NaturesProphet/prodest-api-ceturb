import { Injectable } from '@nestjs/common';
import * as request from 'request-promise';

@Injectable()
export class ViagensService {

    public async retornar_viagens () {
        return [ { "teste": "teste" }, { "teste": "teste" }, ]
    }
}
