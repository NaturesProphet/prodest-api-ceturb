import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity( { name: "VeiculoXPontos" } )
export class VeiculoXPontos extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    veiculo: string;

    @Column( "int" )
    ponto_id_geocontrol: number;

    @Column()
    pontoCodigo: string;

    @Column( "datetime" )
    datahora: Date;

    @Column( "bigint" )
    datahoraMillis: number;

    @Column( "float" )
    velocidade: number;

    @Column( "bit" )
    ignicao: number;
}
