/*Entidade de auditoria para extender os outros modelos e auditar dados - pedido do Paulo */
import { BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiModelProperty } from "@nestjs/swagger";

export class Auditoria extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiModelProperty()
    id: number;

    @Column( { type: "bigint", nullable: true } )
    @ApiModelProperty()
    dataregistro: number;

    @Column( { type: "bigint", nullable: true } )
    @ApiModelProperty()
    atualizadoem: number;

}
