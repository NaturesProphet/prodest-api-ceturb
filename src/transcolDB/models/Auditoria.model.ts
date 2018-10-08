/*Entidade de auditoria para extender os outros modelos e auditar dados - pedido do Paulo */
import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class Auditoria extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    dataregistro: Date;

    @UpdateDateColumn()
    atualizadoem: Date;

}
