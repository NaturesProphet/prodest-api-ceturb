import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Itinerario } from './Itinerario.model';
import { Estimativa } from './Estimativa.model';
import { Auditoria } from './Auditoria.model';
import { Viagem } from './Viagem.model';

@Entity( { name: 'horario' } )
export class Horario extends Auditoria {
    @Column( 'time' )
    horadasaida: Date;

    @Column( 'time' )
    horadachegada: Date;

    @Column( 'bit' )
    acessibilidade: boolean;

    @Column( 'bit' )
    diautil: boolean;

    @Column( 'bit' )
    sabado: boolean;

    @Column( 'bit' )
    domingo: boolean;

    // ###################################################################
    // ############################ RELAÇÕES #############################
    // ###################################################################

    // varias viagens são feitas por um itinerario
    @ManyToOne( type => Itinerario, { nullable: false } )
    @JoinColumn( { name: 'itinerario_id' } )
    itinerario_id: number;

    // um horario possui varias estimativas
    @OneToMany( type => Estimativa, estimativas => Estimativa )
    estimativas: Estimativa[];

    // um horário é executado várias vezes
    @OneToMany( type => Viagem, viagens => Viagem )
    viagens: Viagem[];
}
