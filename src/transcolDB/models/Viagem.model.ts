import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Itinerario } from './Itinerario.model';
import { Estimativa } from './Estimativa.model';
import { Auditoria } from './Auditoria.model';
import { ApiModelProperty } from '@nestjs/swagger';
import { Horario } from './Horario.model';
import { Historico } from './Historico.model';

@Entity()
export class Viagem extends Auditoria {
    @Column( 'datetime' )
    @ApiModelProperty()
    horadasaida: string;

    @Column( 'datetime' )
    @ApiModelProperty()
    horadachegada: string;

    @Column()
    @ApiModelProperty()
    veiculo: string;

    @Column( 'bit' )
    @ApiModelProperty()
    acessibilidade: boolean;

    @Column( 'bit', { default: 0 } )
    @ApiModelProperty()
    diautil: boolean;

    @Column( 'bit', { default: 0 } )
    @ApiModelProperty()
    sabado: boolean;

    @Column( 'bit', { default: 0 } )
    @ApiModelProperty()
    domingo: boolean;

    // ###################################################################
    // ############################ RELAÇÕES #############################
    // ###################################################################

    // varias viagens são feitas por um itinerario
    @ManyToOne( type => Itinerario, { nullable: false } )
    @JoinColumn( { name: 'itinerario_id' } )
    @ApiModelProperty()
    itinerario_id: number;

    // varias viagens são iniciadas em um horario
    @ManyToOne( type => Horario, { nullable: false } )
    @JoinColumn( { name: 'horario_id' } )
    @ApiModelProperty()
    horario_id: number;

    // uma viagem possui varios registros no histórico
    @OneToMany( type => Historico, registros => Historico )
    registros: Historico[];

}
