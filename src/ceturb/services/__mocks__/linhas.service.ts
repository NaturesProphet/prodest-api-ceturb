import { Injectable, HttpService, Res, Body } from '@nestjs/common';

@Injectable()
export class LinhasService {

    public async retornar_linhas () {
        return [ { "teste": "teste" }, { "teste": "teste" }, { "teste": "teste" }, { "teste": "teste" }, ]
    }
}
