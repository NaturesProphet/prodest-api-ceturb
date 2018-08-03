import { Controller, Get } from "@nestjs/common";
import { PontoService } from '../services/ponto.service';
import { InformationNotFound } from '../models/exception/InformationNotFound';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Ponto } from "../models/dto/ponto.entity";

@ApiUseTags( "ceturb" )
@Controller()
export class CeturbController {

  constructor( private readonly pontoService: PontoService ) { }

  @Get( "/" )
  @ApiOperation( {
    description: "Retorna uma mensagem de estado de saude da API dO_Ob",
    title: "Pocando!"
  } )
  @ApiResponse( { status: 200, description: "Retorna mensagem 'Pocando!'" } )
  async default () {
    return "Pocando!";
  }

  @Get( "/pontos" )
  @ApiOperation( {
    description: "retornar os pontos ativos",
    title: "Pontos de parada"
  } )
  @ApiResponse( { status: 200, description: "Lista de pontos de parada", type: Ponto } )
  @ApiResponse( { status: 204, description: "Pontos não encontrados" } )
  async retornar_pontos () {
    try {
      return await this.pontoService.retornar_pontos();
    }
    catch ( error ) {
      throw new InformationNotFound( "Pontos não encontrados" );
    }

  }

}
