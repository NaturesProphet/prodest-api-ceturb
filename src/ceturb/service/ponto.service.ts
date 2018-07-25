import { Injectable, HttpService } from "@nestjs/common";
import { Ponto } from "../model/dto/ponto.entity";

@Injectable()
export class PontoService {
  private url_lista_pontos =
    "https://gvbus.geocontrol.com.br/pontual-api-web/listarPontosDeParada";

  constructor(private readonly httpService: HttpService) {}

  public async retornar_pontos() {
    let pontos_enviados = await this.httpService
      .get(this.url_lista_pontos)
      .toPromise();

    /*
    let pontos = [];

    console.log(pontos_enviados);

    pontos_enviados.data.forEach(ponto_enviado => {
      let ponto = new Ponto(
        ponto_enviado.id,
        ponto_enviado.codigo,
        ponto_enviado.municipio,
        ponto_enviado.logradouro,
        ponto_enviado.referencia,
        ponto_enviado.latitude,
        ponto_enviado.longitude,
        ponto_enviado.azimute,
        ponto_enviado.terminal
      );
      pontos.push(ponto);
    });*/
    let pontos = [];
    let ponto = new Ponto(
      1,
      "ponto_enviado.codigo",
      "ponto_enviado.municipio",
      "ponto_enviado.logradouro",
      "ponto_enviado.referencia",
      1000,
      100,
      100,
      true
    );
    pontos.push(ponto);

    return pontos;
  }
}
