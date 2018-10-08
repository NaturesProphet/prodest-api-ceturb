import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Itinerario } from './Itinerario.model';
import { Estimativa } from './Estimativa.model';
import { Auditoria } from './Auditoria.model';


@Entity()
export class Viagem extends Auditoria {
    @Column( "datetime" )
    horadasaida: string;

    @Column( "datetime" )
    horadachegada: string;

    @Column()
    veiculo: string;

    @Column( "bit" )
    acessibilidade: boolean;

    @Column( "bit", { default: 0 } )
    diautil: boolean;

    @Column( "bit", { default: 0 } )
    sabado: boolean;

    @Column( "bit", { default: 0 } )
    domingo: boolean;


    //###################################################################
    //############################ RELAÇÕES #############################
    //###################################################################


    //varias viagens são feitas por um itinerario
    @ManyToOne( type => Itinerario, { nullable: false } )
    @JoinColumn( { name: "itinerario_id" } )
    itinerario_id: number;

    //uma viagem possui varias estimativas
    @OneToMany( type => Estimativa, estimativas => Estimativa )
    estimativas: Estimativa[];

}
