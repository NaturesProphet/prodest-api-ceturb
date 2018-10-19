import { Controller, Get, Res, HttpStatus } from "@nestjs/common";
import { PontoService } from '../services/ponto.ceturb.service';
import { InformationNotFound } from '../models/exception/InformationNotFound';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Endpoints } from '../../commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;

@Controller( `${raiz}/pontos` )
@ApiUseTags( "Pontos" )
export class PontosController {

  constructor( private readonly pontoService: PontoService ) { }

  @Get()
  @ApiOperation( {
    description: "retornar os pontos ativos",
    title: "Pontos de parada"
  } )
  @ApiResponse( { status: 200, description: "Pontos encontrados" } )
  @ApiResponse( { status: 204, description: "Pontos não encontrados" } )

  async retornar_pontos ( @Res() res ) {
    try {
      res
        .status( HttpStatus.OK )
        .send( await this.pontoService.retornar_pontos() );
    }
    catch ( error ) {
      res
        .status( HttpStatus.NO_CONTENT )
        .send( new InformationNotFound( "Pontos não encontrados" ) );
    }
  }
}
