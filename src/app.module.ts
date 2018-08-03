import { Module } from "@nestjs/common";
import { CeturbModule } from "./ceturb/modules/ceturb.module";

@Module( {
  imports: [ CeturbModule ]
} )
export class AppModule { }
