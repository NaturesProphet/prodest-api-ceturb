import { Module } from "@nestjs/common";
import { LinhasService } from "../ceturb/services/__mocks__/linhas.service";
import { AgenciasService } from "../ceturb/services/agencia.service";
import { ViagensService } from "../ceturb/services/__mocks__/viagens.service";
import { PontoService } from "../ceturb/services/__mocks__/ponto.service";
import { PontoItinerarioService } from "../ceturb/services/__mocks__/pontos_x_itinerarios.service";
import { ItinerariosService } from "../ceturb/services/__mocks__/itinerarios.service";
import { AgenciaController } from "../ceturb/controllers/agencia.controller";
import { LinhasController } from "../ceturb/controllers/linhas.controller";
import { ViagensController } from "../ceturb/controllers/viagens.controller";
import { PontosController } from "../ceturb/controllers/pontos.controller";
import { PontosItinerariosController } from "../ceturb/controllers/pontosItinerario.controller";
import { ItinerariosController } from '../ceturb/controllers/itinerarios.controller';


@Module( {
  controllers: [
    AgenciaController, LinhasController, ViagensController,
    PontosController, PontosItinerariosController, ItinerariosController
  ],

  providers: [
    AgenciasService, LinhasService, ViagensService, PontoService,
    PontoItinerarioService, ItinerariosService
  ]

} )

export class AppModule { }

