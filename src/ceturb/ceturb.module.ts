import { Module, HttpModule } from "@nestjs/common";
import { PontosController } from './controllers/pontos.controller';
import { LinhasController } from './controllers/linhas.controller';
import { PontoService } from "./services/ponto.service";
import { LinhasService } from './services/linhas.service';
import { ViagensController } from "./controllers/viagens.controller";
import { ViagensService } from "./services/viagens.service";
import { ItinerariosController } from "./controllers/itinerarios.controller";
import { ItinerariosService } from "./services/itinerarios.service";
import { AgenciaController } from "./controllers/agencia.controller";
import { AgenciasService } from "./services/agencia.service";
import { PontosItinerariosController } from "./controllers/pontosItinerario.controller";
import { PontoItinerarioService } from "./services/pontos_x_itinerarios.service";
import { DefaultController } from "./controllers/default.controller";
import { HorariosController } from './controllers/horarios.controller';
import { HorariosService } from './services/horario.service';
import { HorariosObsController } from './controllers/horariosObs.controller';
import { HorariosObsService } from './services/horarioObs.service';

@Module( {
  imports: [ HttpModule ],
  controllers: [ PontosController, LinhasController, ViagensController, 
    ItinerariosController, AgenciaController, PontosItinerariosController, 
    HorariosController, HorariosObsController, DefaultController],
  providers: [ PontoService, LinhasService, ViagensService, ItinerariosService, 
    AgenciasService, PontoItinerarioService, HorariosService, HorariosObsService ]
} )
export class CeturbModule { }
