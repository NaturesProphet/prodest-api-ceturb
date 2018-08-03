import { Injectable, HttpService, Body } from "@nestjs/common";
import { Ponto } from "../models/dto/ponto.entity";
const request = require( 'request' );
@Injectable()
export class PontoService {
  private url_lista_pontos = "https://gvbus.geocontrol.com.br/pontual-api-web/listarPontosDeParada";
  private resp: Array<Ponto>;
  private pontos = [];

  public async retornar_pontos () {

    await Promise.resolve( "Success" )
      .then( request( this.url_lista_pontos, { json: true }, ( erro, resposta, body ) => {
        if ( erro ) { return console.log( erro.message ) };
        this.resp = body;
        for ( let index = 0; index < this.resp.length; index++ ) {
          const obj = {
            id: this.resp[ index ].id,
            codigo: this.resp[ index ].codigo,
            municipio: this.resp[ index ].municipio,
            logradouro: this.resp[ index ].logradouro,
            referencia: this.resp[ index ].referencia,
            latitude: this.resp[ index ].latitude,
            longitude: this.resp[ index ].longitude,
            azimute: this.resp[ index ].azimute,
            terminal: this.resp[ index ].terminal
          }
          this.pontos.push( obj );
        }
      } ) )
      .catch( err => {
        throw new Error( err );
      } );

    return this.pontos;
  }
}
