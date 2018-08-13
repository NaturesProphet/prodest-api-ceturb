import { Injectable, HttpService, Res } from '@nestjs/common';

@Injectable()
export class HorariosObsService {

    public async lista_horarioObs(linha: string) {
        return [ { "teste": "teste" }, { "teste": "teste" },{ "teste": "teste" }]
    }
}
