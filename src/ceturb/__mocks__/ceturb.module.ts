import { Module } from "@nestjs/common";
import { PontosController } from '../controllers/pontos.controller';
import { LinhasController } from '../controllers/linhas.controller';
import { PontoService } from "../services/ponto.ceturb.service";
import { LinhasService } from '../services/linhas.service';
import { ViagensController } from "../controllers/viagens.controller";
import { ViagensService } from "../services/viagens.service";
import { ItinerariosController } from "../controllers/itinerarios.controller";
import { ItinerariosService } from "../services/itinerarios.service";
import { AgenciaController } from "../controllers/agencia.controller";
import { AgenciasService } from "../services/agencia.ceturb.service";
import { PontosItinerariosController } from "../controllers/pontosItinerario.controller";
import { PontoItinerarioService } from "../services/pontos_x_itinerarios.service";
import { HorariosController } from '../controllers/horarios.controller';
import { HorariosService } from '../services/horario.service';
import { EstimativasController } from "../controllers/estimativas.controller";
import { EstimativasService } from "../services/estimativas.service";
import { GtfsService } from '../services/gtfs.service';
import { GtfsController } from '../controllers/gtfs.controller';
import { AreaService } from "../services/area.service";
import { AreaController } from "../controllers/area.controller";
import { CalendarioService } from "../services/calendario.service";
import { CalendarioController } from "../controllers/calendario.controller";
import { MinioService } from '../services/minio.service'

@Module( {
  controllers: [ PontosController, LinhasController, ViagensController,
    ItinerariosController, AgenciaController, PontosItinerariosController,
    HorariosController, EstimativasController, AreaController, GtfsController, CalendarioController ],
  providers: [ PontoService, LinhasService, ViagensService, ItinerariosService,
    AgenciasService, PontoItinerarioService, HorariosService, EstimativasService, AreaService, GtfsService, MinioService, CalendarioService ]
} )


export class CeturbModule { }