import { Injectable, HttpService, Res } from '@nestjs/common';
var request = require( 'request' );
import { Itinerario } from '../models/itinerarios.model.Dto';

@Injectable()
export class ItinerariosService {
    private readonly url: string = "https://gvbus.geocontrol.com.br/pontual-api-web/listarItinerarios";
    private resp: Array<Itinerario>;
    private itinerarios = [];
    constructor() { }

    public async lista_itinerario () {
        await request( this.url, { json: true }, ( error, response, body ) => {
            if ( error ) { console.log( error.message ) }
            this.resp = body;
            for ( let i = 0; i < this.resp.length; i++ ) {
                const obj = {
                    id: this.resp[ i ].id,
                    codigo: this.resp[ i ].codigo,
                    bandeira: this.resp[ i ].bandeira,
                    linhaid: this.resp[ i ].linhaId
                }
                this.itinerarios.push( obj );
            }
        } );
        return this.itinerarios;
    }
}
