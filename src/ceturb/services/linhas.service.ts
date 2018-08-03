import { Injectable, HttpService, Res, Body } from '@nestjs/common';
var request = require( 'request' );
import { Linha } from '../models/linhas.model.Dto';

@Injectable()
export class LinhasService {
    private resp: Array<Linha>;
    private linhas = [];
    private readonly url: string = "https://gvbus.geocontrol.com.br/pontual-api-web/listarLinhas";
    public async retornar_linhas () {

        await Promise.resolve( "Success" )
            .then( request( this.url, { json: true }, ( erro, resposta, body ) => {
                if ( erro ) { return console.log( erro.message ) };
                this.resp = body;
                for ( let index = 0; index < this.resp.length; index++ ) {
                    const obj = {
                        id: this.resp[ index ].id,
                        codigo: this.resp[ index ].codigo,
                        descricao: this.resp[ index ].descricao
                    }
                    this.linhas.push( obj );
                }
            } ) )
            .catch( err => {
                throw new Error( err );
            } );

        return this.linhas;
    }
}
