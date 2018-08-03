import { Module, HttpModule } from "@nestjs/common";
import { CeturbController } from './controllers/ceturb.controller';
import { LinhasController } from './controllers/linhas.controller';
import { PontoService } from "./services/ponto.service";
import { LinhasService } from './services/linhas.service';
import { ViagensController } from "./controllers/viagens.controller";
import { ViagensService } from "./services/viagens.service";
import { ItinerariosController } from "./controllers/itinerarios.controller";
import { ItinerariosService } from "./services/itinerarios.service";

@Module( {
  imports: [ HttpModule ],
  controllers: [ CeturbController, LinhasController, ViagensController, ItinerariosController ],
  providers: [ PontoService, LinhasService, ViagensService, ItinerariosService ]
} )
export class CeturbModule { }
