import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Ponto } from './Ponto.model';
import { Viagem } from './Viagem.model';
import { Itinerario } from './Itinerario.model';


@Entity( { name: "historico_real" } )
export class Historico extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column( "datetime" )
    datadecoleta: Date;

    @Column( { type: "datetime", nullable: true } )
    horarionoponto: Date;

    @Column( { type: "bit", nullable: true } )
    pontofinal: boolean;

    @Column( { type: "bit", nullable: true } )
    pontoinicial: boolean;

    @Column( { type: "float", nullable: true } )
    velocidade: number;

    @Column()
    veiculo: string;

    @Column( { type: "int", nullable: true } )
    sequencia: number;


    //###################################################################
    //############################ RELAÇÕES #############################
    //###################################################################


    //varios registros são de um ponto
    @ManyToOne( type => Ponto, { nullable: true } )
    @JoinColumn( { name: "ponto_id" } )
    ponto_id: number;


    //varios registros são de uma viagem
    @ManyToOne( type => Viagem, { nullable: false } )
    @JoinColumn( { name: "viagem_id" } )
    viagem_id: number;


    //varios registros são de uma viagem
    @ManyToOne( type => Itinerario, { nullable: false } )
    @JoinColumn( { name: "itinerario_id" } )
    itinerario_id: number;
}
