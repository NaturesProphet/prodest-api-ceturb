/*Entidade de contato que será usada para comunicação por email - pedido do Barbosa */
import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Agencia } from './Agencia.model';
import { Auditoria } from './Auditoria.model';

@Entity()
export class Contato extends Auditoria {

    @Index( { unique: true } )
    @Column()
    nome: string;

    @Index( { unique: true } )
    @Column()
    email: string;

    @Column( "bit" )
    ativo: boolean;


    //varios contatos podem receber dados de uma agencia
    @ManyToOne( type => Agencia, { nullable: false } )
    @JoinColumn( { name: "agencia_id" } )
    agencia_id: number;
}
