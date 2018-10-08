import { Entity, Column, ManyToMany } from 'typeorm';
import { Tarifa } from './Tarifa.model';
import { Auditoria } from './Auditoria.model';


@Entity( { name: "formapagamento" } )
export class FormaPagamento extends Auditoria {
    @Column()
    nome: string;


    //###################################################################
    //############################ RELAÇÕES #############################
    //###################################################################


    //varias formas de pagamento se aplicam a varias tarifas
    @ManyToMany( type => Tarifa )
    tarifas: Tarifa[];
}
