import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ponto } from './Ponto.model';
import { Viagem } from './Viagem.model';
import { Itinerario } from './Itinerario.model';

@Entity( { name: "veiculo_ponto_viagem_historico_bruto" } )
export class VeiculoXPontos extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    veiculo: string;

    @Column( "datetime" )
    datahora: Date;

    @Column( "bigint" )
    datahoraMillis: number;

    @Column( { type: "float", nullable: true } )
    velocidade: number;

    @Column( "bit" )
    ignicao: number;

    @Column( { name: "pontoInicial", type: "bit", default: false } )
    pontoInicial: boolean;

    @Column( { name: "pontoFinal", type: "bit", default: false } )
    pontoFinal: boolean;

    @Column( { name: "sequencia", type: "int", nullable: true } )
    sequencia: number;

    @ManyToOne( type => Itinerario, { nullable: false } )
    @JoinColumn( { name: "itinerario_id" } )
    itinerario_id: number;

    @ManyToOne( type => Viagem, { nullable: false } )
    @JoinColumn( { name: "viagem_id" } )
    viagem_id: number;

    @ManyToOne( type => Ponto, { nullable: true } )
    @JoinColumn( { name: "ponto_id" } )
    ponto_id: number;
}
