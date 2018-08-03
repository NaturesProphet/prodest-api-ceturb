import { Module, HttpModule } from "@nestjs/common";
import { CeturbController } from '../controllers/ceturb.controller';
import { LinhasController } from '../controllers/linhas.controller';


import { PontoService } from "../services/ponto.service";
import { LinhasService } from '../services/linhas.service';

@Module( {
  imports: [ HttpModule ],
  controllers: [ CeturbController, LinhasController ],
  providers: [ PontoService, LinhasService ]
} )
export class CeturbModule { }
