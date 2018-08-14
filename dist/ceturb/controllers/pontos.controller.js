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
const ponto_service_1 = require("../services/ponto.service");
const InformationNotFound_1 = require("../models/exception/InformationNotFound");
const swagger_1 = require("@nestjs/swagger");
const ponto_entity_1 = require("../models/dto/ponto.entity");
let PontosController = class PontosController {
    constructor(pontoService) {
        this.pontoService = pontoService;
    }
    retornar_pontos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.pontoService.retornar_pontos();
            }
            catch (error) {
                throw new InformationNotFound_1.InformationNotFound("Pontos não encontrados");
            }
        });
    }
};
__decorate([
    common_1.Get("/pontos"),
    swagger_1.ApiOperation({
        description: "retornar os pontos ativos",
        title: "Pontos de parada"
    }),
    swagger_1.ApiResponse({ status: 200, description: "Lista de pontos de parada", type: ponto_entity_1.Ponto }),
    swagger_1.ApiResponse({ status: 204, description: "Pontos não encontrados" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PontosController.prototype, "retornar_pontos", null);
PontosController = __decorate([
    swagger_1.ApiUseTags("Pontos"),
    common_1.Controller(),
    __metadata("design:paramtypes", [ponto_service_1.PontoService])
], PontosController);
exports.PontosController = PontosController;
//# sourceMappingURL=pontos.controller.js.map