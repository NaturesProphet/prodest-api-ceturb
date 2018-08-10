import { Injectable, HttpService, Body } from '@nestjs/common';
import * as request from 'request-promise';


@Injectable()
export class PontoItinerarioService {

  public async retornar_pontosItinerarios () {
    return [ { "teste": "teste" }, { "teste": "teste" } ]
  }

}
