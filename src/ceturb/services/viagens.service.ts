import { Injectable } from '@nestjs/common';
import { Viagens } from '../models/viagens.model.Dto';
var request = require( 'request' );

@Injectable()
export class ViagensService {
    private resp: Array<Viagens>;
    private viagens = [];
    private readonly url: string = "https://gvbus.geocontrol.com.br/pontual-api-web/listarViagens";
    public async retornar_viagens () {

        await Promise.resolve( "Success" )
            .then( request( this.url, { json: true }, ( erro, resposta, body ) => {
                if ( erro ) { return console.log( erro.message ) };
                this.resp = body;
                for ( let index = 0; index < this.resp.length; index++ ) {
                    const obj = {
                        linhaId: this.resp[ index ].linhaId,
                        acessibilidade: this.resp[ index ].acessibilidade,
                        dataAgendada: this.resp[ index ].dataAgendada,
                        itinerarioId: this.resp[ index ].itinerarioId,
                        veiculo: this.resp[ index ].veiculo
                    }
                    this.viagens.push( obj );
                }
            } ) )
            .catch( err => {
                throw new Error( err );
            } );

        return this.viagens;
    }
}
