import { Entity, Column, Double, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Agencia } from './Agencia.model';
import { Auditoria } from './Auditoria.model';
import { LinhaTarifaVigencia } from './LinhaTarifaVigencia.model';


@Entity()
export class Tarifa extends Auditoria {
    @Column( "float" )
    preco: Double;

    @Column( "date" )
    dataupload: Date;


    //###################################################################
    //############################ RELAÇÕES #############################
    //###################################################################


    //varias tarifas são aplicáveis a varias agencias
    @ManyToOne( type => Agencia, { nullable: false } )
    @JoinColumn( { name: "agencia_id" } )
    agencia_id: number;


    @OneToMany( type => LinhaTarifaVigencia, linhatarifavigencias => LinhaTarifaVigencia )
    linhatarifavigencias: LinhaTarifaVigencia[];

}
