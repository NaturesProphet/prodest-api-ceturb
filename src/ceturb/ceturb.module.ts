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

@Module( {
  imports: [ HttpModule ],
  controllers: [ PontosController, LinhasController, ViagensController, ItinerariosController, AgenciaController ],
  providers: [ PontoService, LinhasService, ViagensService, ItinerariosService, AgenciasService ]
} )
export class CeturbModule { }
