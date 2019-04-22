import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Ponto } from './Ponto.model';
import { Viagem } from './Viagem.model';
import { Itinerario } from './Itinerario.model';


@Entity()
export class Historico extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column( "datetime" )
    datadecoleta: Date;

    @Column( 'datetime' )
    horarionoponto: Date;

    @Column( { type: 'bit' } )
    pontofinal: boolean;

    @Column( { type: 'bit' } )
    pontoinicial: boolean;

    @Column( { type: "float", nullable: true } )
    velocidade: number;

    @Column()
    veiculo: string;

    @Column( { type: "int" } )
    sequencia: number;


    //###################################################################
    //############################ RELAÇÕES #############################
    //###################################################################


    //varias estimativas são de um ponto
    @ManyToOne( type => Ponto, { nullable: false } )
    @JoinColumn( { name: "ponto_id" } )
    ponto_id: number;


    //varias estimativas são de uma viagem
    @ManyToOne( type => Viagem, { nullable: false } )
    @JoinColumn( { name: "viagem_id" } )
    viagem_id: number;


    //varias estimativas são de uma viagem
    @ManyToOne( type => Itinerario, { nullable: false } )
    @JoinColumn( { name: "itinerario_id" } )
    itinerario_id: number;
}
