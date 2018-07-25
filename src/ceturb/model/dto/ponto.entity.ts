export class Ponto {
  readonly id: number;
  readonly codigo: string;
  readonly municipio: string;
  readonly logradouro: string;
  readonly referencia: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly azimute: number;
  readonly terminal: boolean;

  constructor(
    id: number,
    codigo: string,
    municipio: string,
    logradouro: string,
    referencia: string,
    latitude: number,
    longitude: number,
    azimute: number,
    terminal: boolean
  ) {
    this.id = id;
    this.codigo = codigo;
    this.municipio = municipio;
    this.logradouro = logradouro;
    this.referencia = referencia;
    this.latitude = latitude;
    this.longitude = longitude;
    this.azimute = azimute;
    this.terminal = terminal;
  }
}
