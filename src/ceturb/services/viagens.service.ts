import { Injectable } from '@nestjs/common';
import { Viagens } from '../models/viagens.model.Dto';
import * as request from 'request-promise';

@Injectable()
export class ViagensService {
    private resp: Array<Viagens>;
    private viagens = [];
    private readonly url: string = "https://gvbus.geocontrol.com.br/pontual-api-web/listarViagens";
    public async retornar_viagens () {
        return await request.get( this.url, { json: true } );
    }
}
