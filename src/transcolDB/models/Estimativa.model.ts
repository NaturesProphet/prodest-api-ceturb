import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ponto } from './Ponto.model';
import { Viagem } from './Viagem.model';
import { Auditoria } from './Auditoria.model';
import { Horario } from './Horario.model';


@Entity()
export class Estimativa extends Auditoria {

    @Column( "date" )
    datadecoleta: string;

    @Column( 'time' )
    horarionoponto: Date;

    @Column( { type: 'bit', nullable: true } )
    pontofinal: boolean;

    //###################################################################
    //############################ RELAÇÕES #############################
    //###################################################################

    // varias estimativas são de um ponto
    @ManyToOne( type => Ponto, { nullable: false } )
    @JoinColumn( { name: "ponto_id" } )
    ponto_id: number;

    // varias estimativas são de uma viagem do quadro de horários
    @ManyToOne( type => Horario, { nullable: false } )
    @JoinColumn( { name: "horario_id" } )
    horario_id: number;
}
