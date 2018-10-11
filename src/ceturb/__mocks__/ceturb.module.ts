import { Module, HttpModule, NestModule, MiddlewareConsumer, ParseIntPipe } from "@nestjs/common";
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
import { DefaultController } from "../controllers/default.controller";
import { HorariosController } from '../controllers/horarios.controller';
import { HorariosService } from '../services/horario.service';
import { EstimativasController } from "../controllers/estimativas.controller";
import { EstimativasService } from "../services/estimativas.service";
import { GtfsService } from '../services/gtfs.service';
import { GtfsController } from '../controllers/gtfs.controller';
//import * as apicache from 'apicache';
//import * as redis from 'redis';
import { AreaService } from "../services/area.service";
import { AreaController } from "../controllers/area.controller";
import { CalendarioService } from "../services/calendario.service";
import { CalendarioController } from "../controllers/calendario.controller";
import { MinioService } from '../services/minio.service'


/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$ VARIÁVEIS DE AMBIENTE  $$$$$$$$$$$$$$$
$$$$$$$ exemplos: $$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$ export VARIAVEL="VALOR" $$$$$$$$$$$$$$
$$$$$$$ export REDIS_HOST="127.0.0.1" $$$$$$$$
$$$$$$$ export REDIS_PORT="6379" $$$$$$$$$$$$$
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/
/*
let RedisHost: string = process.env.REDIS_HOST || '127.0.0.1';
let RedisPort: number = parseInt( process.env.REDIS_PORT ) || 6379;
let client = redis.createClient( RedisPort, RedisHost );


let cacheWithRedis = apicache.options( { redisClient: client } ).middleware;
*/
@Module( {
  controllers: [ PontosController, LinhasController, ViagensController,
    ItinerariosController, AgenciaController, PontosItinerariosController,
    HorariosController, EstimativasController, AreaController, GtfsController, CalendarioController, DefaultController ],
  providers: [ PontoService, LinhasService, ViagensService, ItinerariosService,
    AgenciasService, PontoItinerarioService, HorariosService, EstimativasService, AreaService, GtfsService, MinioService, CalendarioService ]
} )


/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$$$$$$$$$$$$$$$$$$$ DETALHE IMPORTANTE $$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$$ Ao fazer alterações na API usando o nodemon, sete os tempos $$$$
$$$ de cache para um valor pequeno, como 3 segundos, senão      $$$$
$$$ você vai passar raiva até lembrar do cache kkkkkkkkkkkkkkk  $$$$
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/

export class CeturbModule { }
/*
export class CeturbModule implements NestModule {
  configure ( consumer: MiddlewareConsumer ) {
    consumer
      .apply( cacheWithRedis( '3 hours' ) )
      .forRoutes( PontosController );
    consumer
      .apply( cacheWithRedis( '3 hours' ) )
      .forRoutes( ItinerariosController );
    consumer
      .apply( cacheWithRedis( '3 hours' ) )
      .forRoutes( ViagensController );
    consumer
      .apply( cacheWithRedis( '3 hours' ) )
      .forRoutes( LinhasController );
    consumer
      .apply( cacheWithRedis( '3 hours' ) )
      .forRoutes( PontosItinerariosController );
    consumer
      .apply( cacheWithRedis( '10 seconds' ) )
      .forRoutes( HorariosController );
    consumer
      .apply( cacheWithRedis( '10 seconds' ) )
      .forRoutes( EstimativasController );
    consumer
      .apply( cacheWithRedis( '3 hours' ) )
      .forRoutes( AreaController );
  }
}
*/