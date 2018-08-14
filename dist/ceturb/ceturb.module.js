"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const pontos_controller_1 = require("./controllers/pontos.controller");
const linhas_controller_1 = require("./controllers/linhas.controller");
const ponto_service_1 = require("./services/ponto.service");
const linhas_service_1 = require("./services/linhas.service");
const viagens_controller_1 = require("./controllers/viagens.controller");
const viagens_service_1 = require("./services/viagens.service");
const itinerarios_controller_1 = require("./controllers/itinerarios.controller");
const itinerarios_service_1 = require("./services/itinerarios.service");
const agencia_controller_1 = require("./controllers/agencia.controller");
const agencia_service_1 = require("./services/agencia.service");
const pontosItinerario_controller_1 = require("./controllers/pontosItinerario.controller");
const pontos_x_itinerarios_service_1 = require("./services/pontos_x_itinerarios.service");
const default_controller_1 = require("./controllers/default.controller");
const horarios_controller_1 = require("./controllers/horarios.controller");
const horario_service_1 = require("./services/horario.service");
let CeturbModule = class CeturbModule {
};
CeturbModule = __decorate([
    common_1.Module({
        imports: [common_1.HttpModule],
        controllers: [pontos_controller_1.PontosController, linhas_controller_1.LinhasController, viagens_controller_1.ViagensController,
            itinerarios_controller_1.ItinerariosController, agencia_controller_1.AgenciaController, pontosItinerario_controller_1.PontosItinerariosController,
            horarios_controller_1.HorariosController, default_controller_1.DefaultController],
        providers: [ponto_service_1.PontoService, linhas_service_1.LinhasService, viagens_service_1.ViagensService, itinerarios_service_1.ItinerariosService,
            agencia_service_1.AgenciasService, pontos_x_itinerarios_service_1.PontoItinerarioService, horario_service_1.HorariosService]
    })
], CeturbModule);
exports.CeturbModule = CeturbModule;
//# sourceMappingURL=ceturb.module.js.map