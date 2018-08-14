"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pontos_x_itinerarios_service_1 = require("../services/pontos_x_itinerarios.service");
const pontoItinerario_entity_1 = require("../models/pontoItinerario.entity");
const InformationNotFound_1 = require("../models/exception/InformationNotFound");
let PontosItinerariosController = class PontosItinerariosController {
    constructor(service) {
        this.service = service;
    }
    retornar_pontosItinerarios() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.service.retornar_pontosItinerarios();
            }
            catch (error) {
                throw new InformationNotFound_1.InformationNotFound('Dados não encontrados');
            }
        });
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({
        description: 'retornar as associações pontos x itinerários',
        title: 'Pontos x Itinerários',
    }),
    swagger_1.ApiResponse({
        status: 200,
        description: 'Lista de associações entre pontos e itinerários',
        type: pontoItinerario_entity_1.PontoItinerario,
    }),
    swagger_1.ApiResponse({ status: 204, description: 'Dados não encontrados' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PontosItinerariosController.prototype, "retornar_pontosItinerarios", null);
PontosItinerariosController = __decorate([
    common_1.Controller('pontosItinerarios'),
    swagger_1.ApiUseTags('Pontos x Itinerarios'),
    __metadata("design:paramtypes", [pontos_x_itinerarios_service_1.PontoItinerarioService])
], PontosItinerariosController);
exports.PontosItinerariosController = PontosItinerariosController;
//# sourceMappingURL=pontosItinerario.controller.js.map