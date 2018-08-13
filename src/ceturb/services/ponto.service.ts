import { Injectable, HttpService, Body, HttpException, HttpStatus } from "@nestjs/common";
import * as request from 'request-promise';

@Injectable()
export class PontoService {
  private url = "https://gvbus.geocontrol.com.br/pontual-api-web/listarPontosDeParada";

  public async retornar_pontos () {
    try {
      return await request.get( this.url, { json: true } );
    } catch ( err ) {
      throw new HttpException( 'Erro', HttpStatus.GATEWAY_TIMEOUT );
    }
  }
}
