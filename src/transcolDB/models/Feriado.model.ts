import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Agencia } from './Agencia.model';
import { Auditoria } from './Auditoria.model';

@Entity()
export class Feriado extends Auditoria {

    @Column()
    nome: string;

    @Column( "date" )
    data: Date;

    @Column( "date" )
    dataupload: Date;



    //###################################################################
    //############################ RELAÇÕES #############################
    //###################################################################


    //varios Feriados se aplicam a uma agencia
    @ManyToOne( type => Agencia, { nullable: false } )
    @JoinColumn( { name: "agencia_id" } )
    agencia_id: number;
}
