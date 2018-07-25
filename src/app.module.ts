import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CeturbModule } from "./ceturb/ceturb.module";

@Module({
  imports: [CeturbModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
