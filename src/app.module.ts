import { Module } from "@nestjs/common";
import { CeturbModule } from "./ceturb/ceturb.module";

@Module( {
  imports: [ CeturbModule ]
} )
export class AppModule { }
