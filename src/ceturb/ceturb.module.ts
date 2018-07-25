import { Module, HttpModule } from "@nestjs/common";
import { CeturbController } from "./controller/ceturb.controller";
import { PontoService } from "./service/ponto.service";

@Module({
  imports: [HttpModule],
  controllers: [CeturbController],
  providers: [PontoService]
})
export class CeturbModule {}
