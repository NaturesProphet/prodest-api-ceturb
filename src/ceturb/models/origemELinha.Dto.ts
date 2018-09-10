import { ApiModelProperty } from '@nestjs/swagger';

export class OrigemELinha {

    @ApiModelProperty()
    pontoDeOrigemId: number;

    @ApiModelProperty()
    linhaId: number;
}
