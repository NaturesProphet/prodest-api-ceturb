import { Entity, Column, OneToMany, Index } from 'typeorm';
import { Linha } from './Linha.model';
import { Contato } from './Contato.model';
import { Feriado } from './Feriado.model';
import { Tarifa } from './Tarifa.model';
import { Auditoria } from './Auditoria.model';

@Entity()
export class Agencia extends Auditoria {

    @Index( { unique: true } )
    @Column()
    nome: string;

    @Index( { unique: true } )
    @Column()
    url: string;

    @Column()
    telefone: string;

    @Column( "bit", { default: 0 } )
    historico: boolean;



    //###################################################################
    //############################ RELAÇÕES #############################
    //###################################################################


    //A agencia recebe varias tarifas
    @OneToMany( type => Tarifa, tarifas => Tarifa )
    tarifas: Tarifa[];

    //uma agencia tem varias linhas
    @OneToMany( type => Linha, linhas => Linha )
    linhas: Linha[];

    //uma agencia tem varios contatos
    @OneToMany( type => Contato, contatos => Contato )
    contatos: Contato[];

    //uma agencia tem varios feriados
    @OneToMany( type => Feriado, feriados => Feriado )
    feriados: Feriado[];

}
