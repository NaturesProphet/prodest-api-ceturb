/* Entidade em substituição a tabela itemediária. Pedido do Gary */
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Ponto } from './Ponto.model';
import { Itinerario } from './Itinerario.model';

@Entity( { name: "itinerario_ponto" } )
export class ItinerarioPonto extends BaseEntity {

    @Column( "bit" )
    embarque: boolean;

    @Column( "bit" )
    desembarque: boolean;

    @Column( "int" )
    ordem: number;

    @CreateDateColumn()
    dataregistro: Date;

    @UpdateDateColumn()
    atualizadoem: Date;

    @PrimaryColumn()
    @ManyToOne( type => Ponto, { nullable: false } )
    @JoinColumn( { name: "ponto_id" } )
    ponto_id: number;


    @PrimaryColumn()
    @ManyToOne( type => Itinerario, { nullable: false } )
    @JoinColumn( { name: "itinerario_id" } )
    itinerario_id: number;
}
