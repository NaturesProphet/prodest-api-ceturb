import { Injectable, HttpService, Body } from '@nestjs/common';
import { PontoItinerario } from '../models/pontoItinerario.entity';
const request = require( 'request' );
@Injectable()
export class PontoItinerarioService {
  private url_lista_pontoItinerario =
    'https://gvbus.geocontrol.com.br/pontual-api-web/listarAssociacaoPontoItinerario';
  private resp: Array<PontoItinerario>;
  private pontosItinerarios = [];

  public async retornar_pontosItinerarios () {
    await Promise.resolve( 'Success' )
      .then(
        request(
          this.url_lista_pontoItinerario,
          { json: true },
          ( erro, resposta, body ) => {
            if ( erro ) {
              return console.log( erro.message );
            }
            this.resp = body;
            for ( let index = 0; index < this.resp.length; index++ ) {
              const obj = {
                itinerarioId: this.resp[ index ].itinerarioId,
                ordem: this.resp[ index ].ordem,
                pontoDeParadaId: this.resp[ index ].pontoDeParadaId,
                embarque: this.resp[ index ].embarque,
                desembarque: this.resp[ index ].desembarque,
              };
              this.pontosItinerarios.push( obj );
            }
          },
        ),
    )
      .catch( err => {
        throw new Error( err );
      } );

    return this.pontosItinerarios;
  }
}
