import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BDAgenciaController } from './controllers/bd.agencia.controller';
import { AgenciaService } from './services/agencia.service';
import { LinhaService } from './services/linha.service';
import { BDLinhaController } from './controllers/bd.linha.controller';
import { BDItinerarioController } from './controllers/bd.itinerario.controller';
import { ItinerarioService } from './services/itinerario.service';
import { BDViagemController } from './controllers/bd.viagem.controller';
import { ViagemService } from './services/viagem.service';
import { BDItinerariopontoController } from './controllers/bd.itinerarioponto.controller';
import { ItinerariopontoService } from './services/itinerarioponto.service';
import { BDPontogeograficoController } from './controllers/bd.pontogeografico.controller';
import { PontogeograficoService } from './services/pontogeografico.service';
import { BancoConfig } from '../commom/configs/banco.config';
const database = new BancoConfig();


@Module( {
    imports: [ TypeOrmModule.forRoot( {
        type: database.type,
        host: database.host,
        port: database.port,
        username: database.login,
        password: database.password,
        database: database.schema,
        entities: [ __dirname + '/**/*.model{.ts,.js}' ],
        synchronize: database.sync,
        options: {
            encrypt: false
        }
    } ) ],
    controllers: [ BDAgenciaController, BDLinhaController,
        BDItinerarioController, BDViagemController,
        BDItinerariopontoController, BDPontogeograficoController ],

    providers: [ AgenciaService, LinhaService, ItinerarioService,
        ViagemService, ItinerariopontoService,
        PontogeograficoService ]
} )
export class TranscolDBModule { }
