import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgenciaController } from './controllers/bd.agencia.controller';
import { AgenciaService } from './services/agencia.service';
import { LinhaService } from './services/linha.service';
import { LinhaController } from './controllers/bd.linha.controller';
import { PontoController } from './controllers/bd.pontos.controller';
import { PontoService } from './services/ponto.service';
import { ItinerarioController } from './controllers/bd.itinerario.controller';
import { ItinerarioService } from './services/itinerario.service';
import { ViagemController } from './controllers/bd.viagem.controller';
import { ViagemService } from './services/viagem.service';
import { EstimativaController } from './controllers/bd.estimativa.controller';
import { EstimativaService } from './services/estimativa.service';
import { ItinerariopontoController } from './controllers/bd.itinerarioponto.controller';
import { ItinerariopontoService } from './services/itinerarioponto.service';
import { PontogeograficoController } from './controllers/bd.pontogeografico.controller';
import { PontogeograficoService } from './services/pontogeografico.service';
import { FeriadoController } from './controllers/bd.feriado.controller';
import { FeriadoService } from './services/feriado.service';


const db_type = 'mssql';
const db_host = process.env.TRANSCOLDB_HOST || '127.0.0.1';
const db_port: number = parseInt( process.env.TRANSCOLDB_PORT ) || 1433;
const db_username = process.env.TRANSCOLDB_USER || 'SA';
const db_password = process.env.TRANSCOLDB_PASSWORD || 'Senh@Dif1cil';
const db_schema = process.env.TRANSCOLDB_SCHEMA || 'tempdb';
const orm_sync = ( process.env.TRANSCOLDB_ORM_SYNC === 'true' ) || false;


@Module( {
    imports: [ TypeOrmModule.forRoot( {
        type: db_type,
        host: db_host,
        port: db_port,
        username: db_username,
        password: db_password,
        database: db_schema,
        entities: [ __dirname + '/**/*.model{.ts,.js}' ],
        synchronize: orm_sync,
        options: {
            encrypt: false
        }
    } ) ],
    controllers: [ AgenciaController, LinhaController, PontoController,
        ItinerarioController, ViagemController, EstimativaController,
        ItinerariopontoController, PontogeograficoController, FeriadoController ],

    providers: [ AgenciaService, LinhaService, PontoService, ItinerarioService,
        ViagemService, EstimativaService, ItinerariopontoService,
        PontogeograficoService, FeriadoService ]
} )
export class TranscolDBModule { }
