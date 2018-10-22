import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { CeturbModule } from "./ceturb/ceturb.module";
import { TranscolDBModule } from "./transcolDB/transcolDB.module";
import { PontosController } from "./ceturb/controllers/pontos.controller";
import { ItinerariosController } from "./ceturb/controllers/itinerarios.controller";
import { ViagensController } from "./ceturb/controllers/viagens.controller";
import { LinhasController } from "./ceturb/controllers/linhas.controller";
import { PontosItinerariosController } from "./ceturb/controllers/pontosItinerario.controller";
import { HorariosController } from "./ceturb/controllers/horarios.controller";
import { EstimativasController } from "./ceturb/controllers/estimativas.controller";
import { BDAgenciaController } from "./transcolDB/controllers/bd.agencia.controller";
import { BDItinerarioController } from "./transcolDB/controllers/bd.itinerario.controller";
import { BDLinhaController } from "./transcolDB/controllers/bd.linha.controller";
import { BDPontogeograficoController } from "./transcolDB/controllers/bd.pontogeografico.controller";
import { BDViagemController } from "./transcolDB/controllers/bd.viagem.controller";
import { DefaultController } from "./default.controller";
import { RedisConfig } from "./commom/configs/redis.config";
const redisConf = new RedisConfig();


@Module( {
  imports: [ CeturbModule, TranscolDBModule ],
  controllers: [ DefaultController ]
} )

export class AppModule implements NestModule {
  configure ( consumer: MiddlewareConsumer ) {
    consumer
      .apply( redisConf.cacheWithRedis( '3 hours' ) )
      .forRoutes( PontosController );
    consumer
      .apply( redisConf.cacheWithRedis( '3 hours' ) )
      .forRoutes( ItinerariosController );
    consumer
      .apply( redisConf.cacheWithRedis( '3 hours' ) )
      .forRoutes( ViagensController );
    consumer
      .apply( redisConf.cacheWithRedis( '3 hours' ) )
      .forRoutes( LinhasController );
    consumer
      .apply( redisConf.cacheWithRedis( '3 hours' ) )
      .forRoutes( PontosItinerariosController );
    consumer
      .apply( redisConf.cacheWithRedis( '10 seconds' ) )
      .forRoutes( HorariosController );
    consumer
      .apply( redisConf.cacheWithRedis( '10 seconds' ) )
      .forRoutes( EstimativasController );
    consumer
      .apply( redisConf.cacheWithRedis( '3 hours' ) )
      .forRoutes( BDAgenciaController );
    consumer
      .apply( redisConf.cacheWithRedis( '3 hours' ) )
      .forRoutes( BDItinerarioController );
    consumer
      .apply( redisConf.cacheWithRedis( '3 hours' ) )
      .forRoutes( BDLinhaController );
    consumer
      .apply( redisConf.cacheWithRedis( '3 hours' ) )
      .forRoutes( BDPontogeograficoController );
    consumer
      .apply( redisConf.cacheWithRedis( '3 hours' ) )
      .forRoutes( BDViagemController );
  }
}
