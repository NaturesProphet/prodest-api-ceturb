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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const itinerarios_service_1 = require("../services/itinerarios.service");
let ItinerariosController = class ItinerariosController {
    constructor(service) {
        this.service = service;
    }
    listar() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.lista_itinerario();
        });
    }
    buscar(linha) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.busca_itinerario(linha);
        });
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ title: 'lista os itinerários existentes' }),
    swagger_1.ApiResponse({ status: 200, description: 'Found.' }),
    swagger_1.ApiResponse({ status: 404, description: 'Not found.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItinerariosController.prototype, "listar", null);
__decorate([
    common_1.Get('/:linha'),
    swagger_1.ApiOperation({ title: 'lista os itinerários existentes de uma linha' }),
    swagger_1.ApiResponse({ status: 200, description: 'Found.' }),
    swagger_1.ApiResponse({ status: 404, description: 'Not found.' }),
    __param(0, common_1.Param('linha')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItinerariosController.prototype, "buscar", null);
ItinerariosController = __decorate([
    common_1.Controller('itinerarios'),
    swagger_1.ApiUseTags('Itinerarios'),
    __metadata("design:paramtypes", [itinerarios_service_1.ItinerariosService])
], ItinerariosController);
exports.ItinerariosController = ItinerariosController;
//# sourceMappingURL=itinerarios.controller.js.map