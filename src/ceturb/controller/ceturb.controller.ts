import { Controller, Get } from "@nestjs/common";
import { PontoService } from "../service/ponto.service";

@Controller("v1")
export class CeturbController {
  constructor(private readonly pontoService: PontoService) {}
  @Get("/pontos")
  async retornar_pontos() {
    return await this.pontoService.retornar_pontos();
  }
}
