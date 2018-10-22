import { Controller, Get, Res, HttpStatus, Param } from "@nestjs/common";
import { PontoService } from '../services/ponto.ceturb.service';
import { InformationNotFound } from '../models/exception/InformationNotFound';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { Endpoints } from '../../commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;

@Controller( `${raiz}/pontos` )
@ApiUseTags( "Pontos" )
export class PontosController {

  constructor( private readonly pontoService: PontoService ) { }

  @Get()
  @ApiOperation( {
    description: "lista os pontos de parada ativos. \nOrigem: ceturb/geocontrol",
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

  @Get( '/area/:ponto_geografico_esquerdo_inferior/:ponto_geografico_esquerdo_superior/:ponto_geografico_direito_superior/:ponto_geografico_direito_inferior' )
  @ApiOperation( {
    description: "Retorna um array com os ids dos pontos de parada dentro da area do mapa especificada."
      + "\nAlguns valores para teste: \n"
      + "ponto_geografico_esquerdo_inferior: -20.282983882640348 \n"
      + "ponto_geografico_esquerdo_superior: -40.309548147161195 \n"
      + "ponto_geografico_direito_superior: -40.29407716556429\n"
      + "ponto_geografico_direito_inferior: -20.274791927077008 \n"
      + "A URL para essa busca ficaria assim:\n"
      + "/area/-40.309548147161195/-20.282983882640348/-40.29407716556429/-20.274791927077008",
    title: "Pontos de parada por Area do mapa"
  } )
  @ApiResponse( { status: 200, description: "Pontos encontrados" } )
  @ApiResponse( { status: 204, description: "Pontos não encontrados" } )
  @ApiResponse( { status: 400, description: "Parâmetros fora do formato numérico" } )
  @ApiImplicitParam( {
    name: 'ponto_geografico_direito_inferior',
    description: 'Coordenada do ponto geográfico direito inferior (SIGNED FLOAT)',
    required: true,
  } )
  @ApiImplicitParam( {
    name: 'ponto_geografico_direito_superior',
    description: 'Coordenada do ponto geográfico direito superior (SIGNED FLOAT)',
    required: true,
  } )
  @ApiImplicitParam( {
    name: 'ponto_geografico_esquerdo_superior',
    description: 'Coordenada do ponto geográfico esquerdo superior (SIGNED FLOAT)',
    required: true,
  } )
  @ApiImplicitParam( {
    name: 'ponto_geografico_esquerdo_inferior',
    description: 'Coordenada do ponto geográfico esquerdo inferior (SIGNED FLOAT)',
    required: true,
  } )
  async retornar_pontos_por_area_do_mapa ( @Res() res, @Param() params ) {
    try {
      let Left: number = parseFloat( params.ponto_geografico_esquerdo_inferior );
      let Top: number = parseFloat( params.ponto_geografico_esquerdo_superior );
      let Right: number = parseFloat( params.ponto_geografico_direito_superior );
      let Bottom: number = parseFloat( params.ponto_geografico_direito_inferior );
      let coordenadas = [ Left, Top, Right, Bottom ];

      //verifica se algum valor informado não era um numero
      if ( !Number.isNaN( Left ) && !Number.isNaN( Top )
        && !Number.isNaN( Right ) && !Number.isNaN( Bottom ) ) {
        res
          .status( HttpStatus.OK )
          .send( await this.pontoService.BuscaPontosPorArea( coordenadas ) );
      } else {
        res
          .status( HttpStatus.BAD_REQUEST )
          .send( "Um dos parâmetros informados não era um valor válido" );
      }
    }
    catch ( error ) {
      res
        .status( HttpStatus.NOT_FOUND )
        .send( new InformationNotFound( "Pontos não encontrados" ) );
    }
  }

}
