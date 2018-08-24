import { Module, HttpModule, NestModule, MiddlewareConsumer, ParseIntPipe } from "@nestjs/common";
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
import * as redis from 'redis';

/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$ VARIÁVEIS DE AMBIENTE  $$$$$$$$$$$$$$$
$$$$$$$ exemplos: $$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$ export VARIAVEL="VALOR" $$$$$$$$$$$$$$
$$$$$$$ export REDIS_HOST="127.0.0.1" $$$$$$$$
$$$$$$$ export REDIS_PORT="6379" $$$$$$$$$$$$$
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/

let RedisHost: string = process.env.REDIS_HOST || '127.0.0.1';
let RedisPort: number = parseInt( process.env.REDIS_PORT ) || 6379;

let client = redis.createClient( RedisPort, RedisHost );


let cacheWithRedis = apicache.options( { redisClient: client } ).middleware;

@Module( {
  imports: [ HttpModule ],
  controllers: [ PontosController, LinhasController, ViagensController,
    ItinerariosController, AgenciaController, PontosItinerariosController,
    HorariosController, DefaultController ],
  providers: [ PontoService, LinhasService, ViagensService, ItinerariosService,
    AgenciasService, PontoItinerarioService, HorariosService ]
} )


/*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$$$$$$$$$$$$$$$$$$$ DETALHE IMPORTANTE $$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$$ Ao fazer alterações na API usando o nodemon, sete os tempos $$$$
$$$ de cache para um valor pequeno, como 3 segundos, senão      $$$$
$$$ você vai passar raiva até lembrar do cache kkkkkkkkkkkkkkk  $$$$
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/


export class CeturbModule implements NestModule {
  configure ( consumer: MiddlewareConsumer ) {
    consumer
      .apply( cacheWithRedis( '3 hours' ) )
      //.apply( cacheWithRedis( '3 seconds' ) )
      .forRoutes( PontosController );
    consumer
      //.apply( cacheWithRedis( '3 seconds' ) )
      .apply( cacheWithRedis( '3 hours' ) )
      .forRoutes( ItinerariosController );
    consumer
      //.apply( cacheWithRedis( '3 seconds' ) )
      .apply( cacheWithRedis( '3 hours' ) )
      .forRoutes( ViagensController );
    consumer
      //.apply( cacheWithRedis( '3 seconds' ) )
      .apply( cacheWithRedis( '3 hours' ) )
    //.forRoutes( LinhasController );
    consumer
      //.apply( cacheWithRedis( '3 seconds' ) )
      .apply( cacheWithRedis( '3 hours' ) )
      .forRoutes( PontosItinerariosController );
    consumer
      //.apply( cacheWithRedis( '3 seconds' ) )
      .apply( cacheWithRedis( '10 seconds' ) )
      .forRoutes( HorariosController );
  }
}
