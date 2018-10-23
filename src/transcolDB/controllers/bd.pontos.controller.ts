import { Controller, Get, Res, HttpStatus, Param } from "@nestjs/common";
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { Endpoints } from '../../commom/configs/endpoints.config';
import { PontoService } from "../services/ponto.service";
const raiz: string = new Endpoints().rotaRaiz;

@Controller( `${raiz}/pontos` )
@ApiUseTags( "Pontos" )
export class BDPontosController {
  constructor( private readonly pontoService: PontoService ) { }

  @Get( '/:codigo_ponto/itinerarios' )
  @ApiOperation( {
    description: "Listar todos os itinerarios que passam por um ponto. \nOrigem: banco de dados",
    title: "Itinerarios por Ponto"
  } )
  @ApiResponse( { status: 302, description: "Itinerarios encontrados" } )
  @ApiResponse( { status: 404, description: "Itinerarios não encontrados" } )
  @ApiResponse( { status: 502, description: "Erro na busca" } )
  @ApiImplicitParam( {
    name: 'codigo_ponto',
    description: 'codigo do ponto de parada',
    required: true,
  } )
  async getItinerariosByCodigo ( @Res() res, @Param( 'codigo_ponto' ) codigo_ponto ) {
    try {
      let itinerarios = await this.pontoService.getItinerariosPorPonto( codigo_ponto );
      if ( itinerarios.length > 0 ) {
        res
          .status( HttpStatus.FOUND )
          .send( itinerarios );
      } else {
        res
          .status( HttpStatus.NOT_FOUND )
          .send( "Nenhum itinerario encontrado na busca" )
      }
    } catch ( err ) {
      res
        .status( HttpStatus.BAD_GATEWAY )
        .send( err.message );
    }
  }
}
