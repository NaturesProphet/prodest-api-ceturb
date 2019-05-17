/*Entidade de auditoria para extender os outros modelos e auditar dados - pedido do Paulo */
import { BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiModelProperty } from "@nestjs/swagger";

export class Auditoria extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiModelProperty()
    id: number;

    @Column( { type: "bigint", nullable: true } )
    @ApiModelProperty()
    inicio_vigencia: number;

    @Column( { type: "bigint", nullable: true } )
    @ApiModelProperty()
    fim_vigencia: number;
}
