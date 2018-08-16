import { Injectable, HttpService, Body, HttpException, HttpStatus } from "@nestjs/common";
import * as request from 'request-promise';

@Injectable()
export class PontoService {
  private url = "https://gvbus.geocontrol.com.br/pontual-api-web/listarPontosDeParada";

  public async retornar_pontos () {

    return request.get( this.url, { json: true } );

  }
}
