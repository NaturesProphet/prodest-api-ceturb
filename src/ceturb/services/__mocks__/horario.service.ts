import { Injectable, HttpService, Res } from '@nestjs/common';

@Injectable()
export class HorariosService {

    public async lista_horario(linha: string) {
        return [ { "teste": "teste" }, { "teste": "teste" }, { "teste": "teste" },{ "teste": "teste" }]
    }
}
