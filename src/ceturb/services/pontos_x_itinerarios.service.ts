import { Injectable, HttpService, Body } from '@nestjs/common';
import * as request from 'request-promise';


@Injectable()
export class PontoItinerarioService {
  private url = 'https://gvbus.geocontrol.com.br/pontual-api-web/listarAssociacaoPontoItinerario';

  public async retornar_pontosItinerarios () {
    return await request.get( this.url, { json: true } );
  }

}
