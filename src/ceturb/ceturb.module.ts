import { Module, HttpModule, NestModule, MiddlewareConsumer } from "@nestjs/common";
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
import * as apicache from 'apicache';
let cache = apicache.middleware;

@Module( {
  imports: [ HttpModule ],
  controllers: [ PontosController, LinhasController, ViagensController,
    ItinerariosController, AgenciaController, PontosItinerariosController,
    HorariosController, DefaultController ],
  providers: [ PontoService, LinhasService, ViagensService, ItinerariosService,
    AgenciasService, PontoItinerarioService, HorariosService ]
} )
export class CeturbModule implements NestModule {
  configure ( consumer: MiddlewareConsumer ) {
    consumer
      .apply( cache( '3 hours' ) )
      .forRoutes( PontosController );
    consumer
      .apply( cache( '3 hours' ) )
      .forRoutes( ItinerariosController );
    consumer
      .apply( cache( '3 hours' ) )
      .forRoutes( ViagensController );
    consumer
      .apply( cache( '3 hours' ) )
      .forRoutes( LinhasController );
    consumer
      .apply( cache( '3 hours' ) )
      .forRoutes( PontosItinerariosController );
    consumer
      .apply( cache( '10 seconds' ) )
      .forRoutes( HorariosController );
  }
}
