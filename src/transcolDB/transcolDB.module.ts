import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BDAgenciaController } from './controllers/bd.agencia.controller';
import { AgenciaService } from './services/agencia.service';
import { BDItinerarioController } from './controllers/bd.itinerario.controller';
import { ItinerarioService } from './services/itinerario.service';
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
    controllers: [ BDAgenciaController, BDItinerarioController, BDPontogeograficoController ],

    providers: [ AgenciaService, ItinerarioService, PontogeograficoService ]
} )

export class TranscolDBModule { }
