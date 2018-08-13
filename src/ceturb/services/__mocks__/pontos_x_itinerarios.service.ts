import { Injectable, HttpService, Body } from '@nestjs/common';


@Injectable()
export class PontoItinerarioService {

  public async retornar_pontosItinerarios () {

    let obj1 = { "itinerarioId": 448, "ordem": 1, "pontoDeParadaId": 3752, "embarque": true, "desembarque": false }

    let obj2 = { "itinerarioId": 448, "ordem": 2, "pontoDeParadaId": 3750, "embarque": true, "desembarque": true }

    let obj3 = { "itinerarioId": 448, "ordem": 3, "pontoDeParadaId": 3753, "embarque": true, "desembarque": true }

    return [ obj1, obj2, obj3 ];
  }

}
