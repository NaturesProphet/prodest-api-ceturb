import { Injectable, HttpService, Res, Body } from '@nestjs/common';
import { Linha } from '../models/linhas.model.Dto';
import * as request from 'request-promise';

@Injectable()
export class LinhasService {
    private linhas = [];
    private readonly url: string = "https://gvbus.geocontrol.com.br/pontual-api-web/listarLinhas";

    public async retornar_linhas () {
        let resp: Array<Linha> = await request.get( this.url, { json: true } );
        for ( let index = 0; index < resp.length; index++ ) {
            this.linhas.push( resp[ index ] );
        }
        return this.linhas;
    }
}
