import { ApiModelProperty } from '@nestjs/swagger';

export class Envelope {

    @ApiModelProperty()
    envelope: number[];
}
