import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BDAgenciaController } from '../controllers/bd.agencia.controller';
import { AgenciaService } from '../services/agencia.service';
import { LinhaService } from '../services/linha.service';
import { BDLinhaController } from '../controllers/bd.linha.controller';
import { BDPontoController } from '../controllers/bd.pontos.controller';
import { PontoService } from '../services/ponto.service';
import { BDItinerarioController } from '../controllers/bd.itinerario.controller';
import { ItinerarioService } from '../services/itinerario.service';
import { BDViagemController } from '../controllers/bd.viagem.controller';
import { ViagemService } from '../services/viagem.service';
import { BDEstimativaController } from '../controllers/bd.estimativa.controller';
import { EstimativaService } from '../services/estimativa.service';
import { BDItinerariopontoController } from '../controllers/bd.itinerarioponto.controller';
import { ItinerariopontoService } from '../services/itinerarioponto.service';
import { BDPontogeograficoController } from '../controllers/bd.pontogeografico.controller';
import { PontogeograficoService } from '../services/pontogeografico.service';


const db_type = 'mssql';
const db_host = process.env.TRANSCOLDB_HOST || '127.0.0.1';
const db_port: number = parseInt( process.env.TRANSCOLDB_PORT ) || 1433;
const db_username = process.env.TRANSCOLDB_USER || 'SA';
const db_password = process.env.TRANSCOLDB_PASSWORD || 'Senh@Dif1cil';
const db_schema = process.env.TRANSCOLDB_SCHEMA || 'tempdb';
const orm_sync = ( process.env.TRANSCOLDB_ORM_SYNC === 'true' ) || false;


@Module( {
    controllers: [ BDAgenciaController, BDLinhaController, BDPontoController,
        BDItinerarioController, BDViagemController, BDEstimativaController,
        BDItinerariopontoController, BDPontogeograficoController ],

    providers: [ AgenciaService, LinhaService, PontoService, ItinerarioService,
        ViagemService, EstimativaService, ItinerariopontoService,
        PontogeograficoService ]
} )
export class TranscolDBModule { }
