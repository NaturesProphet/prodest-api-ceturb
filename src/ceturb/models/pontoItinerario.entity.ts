import { ApiModelProperty } from '@nestjs/swagger';
export class PontoItinerario {
  @ApiModelProperty() readonly itinerarioId: number;
  @ApiModelProperty() readonly ordem: number;
  @ApiModelProperty() readonly pontoDeParadaId: number;
  @ApiModelProperty() readonly embarque: boolean;
  @ApiModelProperty() readonly desembarque: boolean;

  constructor(
    itinerarioId: number,
    ordem: number,
    pontoDeParadaId: number,
    embarque: boolean,
    desembarque: boolean,
  ) {
    itinerarioId = itinerarioId;
    ordem = ordem;
    pontoDeParadaId = pontoDeParadaId;
    embarque = embarque;
    desembarque = desembarque;
  }
}
