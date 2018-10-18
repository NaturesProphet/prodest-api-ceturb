import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { CeturbModule } from "./ceturb/ceturb.module";
import { TranscolDBModule } from "./transcolDB/transcolDB.module";
import * as apicache from 'apicache';
import * as redis from 'redis';
import { PontosController } from "ceturb/controllers/pontos.controller";
import { ItinerariosController } from "ceturb/controllers/itinerarios.controller";
import { ViagensController } from "ceturb/controllers/viagens.controller";
import { LinhasController } from "ceturb/controllers/linhas.controller";
import { PontosItinerariosController } from "ceturb/controllers/pontosItinerario.controller";
import { HorariosController } from "ceturb/controllers/horarios.controller";
import { EstimativasController } from "ceturb/controllers/estimativas.controller";
import { AreaController } from "ceturb/controllers/area.controller";
import { BDAgenciaController } from "transcolDB/controllers/bd.agencia.controller";
import { BDEstimativaController } from "transcolDB/controllers/bd.estimativa.controller";
import { BDFeriadoController } from "transcolDB/controllers/bd.feriado.controller";
import { BDItinerarioController } from "transcolDB/controllers/bd.itinerario.controller";
import { BDItinerariopontoController } from "transcolDB/controllers/bd.itinerarioponto.controller";
import { BDLinhaController } from "transcolDB/controllers/bd.linha.controller";
import { BDPontoController } from "transcolDB/controllers/bd.pontos.controller";
import { BDPontogeograficoController } from "transcolDB/controllers/bd.pontogeografico.controller";
import { BDViagemController } from "transcolDB/controllers/bd.viagem.controller";
import { DefaultController } from "default.controller";



let RedisHost: string = process.env.REDIS_HOST || '127.0.0.1';
let RedisPort: number = parseInt( process.env.REDIS_PORT ) || 6379;
let client = redis.createClient( RedisPort, RedisHost );
let cacheWithRedis = apicache.options( { redisClient: client } ).middleware;


@Module( {
  imports: [ CeturbModule, TranscolDBModule ],
  controllers: [ DefaultController ]
} )

export class AppModule implements NestModule {
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
    consumer
      .apply( cacheWithRedis( '3 hours' ) )
      .forRoutes( BDAgenciaController );
    consumer
      .apply( cacheWithRedis( '3 hours' ) )
      .forRoutes( BDEstimativaController );
    consumer
      .apply( cacheWithRedis( '3 hours' ) )
      .forRoutes( BDFeriadoController );
    consumer
      .apply( cacheWithRedis( '3 hours' ) )
      .forRoutes( BDItinerarioController );
    consumer
      .apply( cacheWithRedis( '3 hours' ) )
      .forRoutes( BDItinerariopontoController );
    consumer
      .apply( cacheWithRedis( '3 hours' ) )
      .forRoutes( BDLinhaController );
    consumer
      .apply( cacheWithRedis( '3 hours' ) )
      .forRoutes( BDPontoController );
    consumer
      .apply( cacheWithRedis( '3 hours' ) )
      .forRoutes( BDPontogeograficoController );
    consumer
      .apply( cacheWithRedis( '3 hours' ) )
      .forRoutes( BDViagemController );
  }
}
