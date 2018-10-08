import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Itinerario } from './Itinerario.model';
import { Auditoria } from './Auditoria.model';

@Entity( { name: "pontogeografico" } )
export class PontoGeografico extends Auditoria {
    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column( { nullable: true } )
    altitude: string;

    @Column( "int" )
    sequencia: number;

    @Column( "date" )
    dataupload: Date;


    //###################################################################
    //############################ RELAÇÕES #############################
    //###################################################################


    //varios 'Vértices' deste modelo formam o shape de cada itinerário
    @ManyToOne( type => Itinerario, { nullable: false } )
    @JoinColumn( { name: "itinerario_id" } )
    itinerario_id: number;
}
