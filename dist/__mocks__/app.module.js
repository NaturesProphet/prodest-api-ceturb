"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const linhas_service_1 = require("../ceturb/services/__mocks__/linhas.service");
const agencia_service_1 = require("../ceturb/services/agencia.service");
const viagens_service_1 = require("../ceturb/services/__mocks__/viagens.service");
const ponto_service_1 = require("../ceturb/services/__mocks__/ponto.service");
const pontos_x_itinerarios_service_1 = require("../ceturb/services/__mocks__/pontos_x_itinerarios.service");
const itinerarios_service_1 = require("../ceturb/services/__mocks__/itinerarios.service");
const horario_service_1 = require("../ceturb/services/__mocks__/horario.service");
const agencia_controller_1 = require("../ceturb/controllers/agencia.controller");
const linhas_controller_1 = require("../ceturb/controllers/linhas.controller");
const viagens_controller_1 = require("../ceturb/controllers/viagens.controller");
const pontos_controller_1 = require("../ceturb/controllers/pontos.controller");
const pontosItinerario_controller_1 = require("../ceturb/controllers/pontosItinerario.controller");
const itinerarios_controller_1 = require("../ceturb/controllers/itinerarios.controller");
const horarios_controller_1 = require("../ceturb/controllers/horarios.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        controllers: [
            agencia_controller_1.AgenciaController, linhas_controller_1.LinhasController, viagens_controller_1.ViagensController,
            pontos_controller_1.PontosController, pontosItinerario_controller_1.PontosItinerariosController, itinerarios_controller_1.ItinerariosController,
            horarios_controller_1.HorariosController
        ],
        providers: [
            agencia_service_1.AgenciasService, linhas_service_1.LinhasService, viagens_service_1.ViagensService, ponto_service_1.PontoService,
            pontos_x_itinerarios_service_1.PontoItinerarioService, itinerarios_service_1.ItinerariosService, horario_service_1.HorariosService,
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map