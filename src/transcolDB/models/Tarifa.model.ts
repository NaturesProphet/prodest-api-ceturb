import { Entity, Column, ManyToMany, Double, JoinTable, JoinColumn, ManyToOne } from 'typeorm';
import { FormaPagamento } from './FormaPagamento.model';
import { Agencia } from './Agencia.model';
import { Auditoria } from './Auditoria.model';


@Entity()
export class Tarifa extends Auditoria {
    @Column( "float" )
    preco: Double;

    @Column()
    tipo: string;


    //###################################################################
    //############################ RELAÇÕES #############################
    //###################################################################


    //varias tarifas são aplicáveis a varias agencias
    @ManyToOne( type => Agencia, { nullable: false } )
    @JoinColumn( { name: "agencia_id" } )
    agencia_id: number;

    //varias tarifas são pagas por varias formas de pagamento
    @ManyToMany( type => FormaPagamento )
    @JoinTable( {
        name: "tarifa_formapagamento", joinColumns: [
            { name: "tarifa_id" }
        ], inverseJoinColumns: [
            {
                name: "formapagamento_id"
            }
        ]
    } )
    formasPagamento: FormaPagamento[];

}
