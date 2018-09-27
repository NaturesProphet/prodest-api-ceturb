import { Module } from "@nestjs/common";
import { LinhasService } from "../ceturb/services/linhas.service";
import { AgenciasService } from "../ceturb/services/agencia.service";
import { ViagensService } from "../ceturb/services/viagens.service";
import { PontoService } from "../ceturb/services/ponto.service";
import { PontoItinerarioService } from "../ceturb/services/pontos_x_itinerarios.service";
import { ItinerariosService } from "../ceturb/services/itinerarios.service";
import { HorariosService } from '../ceturb/services/horario.service';
import { GtfsService } from '../ceturb/services/gtfs.service';

import { AgenciaController } from "../ceturb/controllers/agencia.controller";
import { LinhasController } from "../ceturb/controllers/linhas.controller";
import { ViagensController } from "../ceturb/controllers/viagens.controller";
import { PontosController } from "../ceturb/controllers/pontos.controller";
import { PontosItinerariosController } from "../ceturb/controllers/pontosItinerario.controller";
import { ItinerariosController } from '../ceturb/controllers/itinerarios.controller';
import { HorariosController } from '../ceturb/controllers/horarios.controller';
import { EstimativasController } from "../ceturb/controllers/estimativas.controller";
import { AreaController } from "../ceturb/controllers/area.controller";
import { EstimativasService } from "../ceturb/services/estimativas.service";
import { AreaService } from "../ceturb/services/area.service";
import { GtfsController } from '../ceturb/controllers/gtfs.controller';
import { CalendarioService } from "../ceturb/services/calendario.service";
import { CalendarioController } from "../ceturb/controllers/calendario.controller";

@Module( {
  controllers: [
    AgenciaController, LinhasController, ViagensController,
    PontosController, PontosItinerariosController, ItinerariosController,
    HorariosController, EstimativasController, AreaController, CalendarioController, GtfsController
  ],

  providers: [
    AgenciasService, LinhasService, ViagensService, PontoService,
    PontoItinerarioService, ItinerariosService, HorariosService, EstimativasService,
    AreaService, CalendarioService, GtfsService

  ]

} )

export class AppModule { }