import { Injectable, HttpService, Body } from "@nestjs/common";

@Injectable()
export class PontoService {

  public async retornar_pontos () {
    return [ { "teste": "teste" }, { "teste": "teste" }, ]
  }
}
