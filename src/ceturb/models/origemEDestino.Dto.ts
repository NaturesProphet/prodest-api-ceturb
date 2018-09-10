import { ApiModelProperty } from '@nestjs/swagger';

export class OrigemEDestino {

    @ApiModelProperty()
    pontoDeOrigemId: number;

    @ApiModelProperty()
    pontoDeDestinoId: number;

}
