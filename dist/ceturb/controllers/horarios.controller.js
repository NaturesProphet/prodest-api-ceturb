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
const horario_service_1 = require("../services/horario.service");
let HorariosController = class HorariosController {
    constructor(service) {
        this.service = service;
    }
    listar(linha) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.lista_horario(linha);
        });
    }
    listarObs(linha) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.lista_horarioObs(linha);
        });
    }
};
__decorate([
    common_1.Get(':linha'),
    swagger_1.ApiOperation({ title: 'lista as linhas existentes' }),
    swagger_1.ApiResponse({ status: 200, description: 'Found.' }),
    swagger_1.ApiResponse({ status: 404, description: 'Not found.' }),
    __param(0, common_1.Param('linha')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HorariosController.prototype, "listar", null);
__decorate([
    common_1.Get('/obs/:linha'),
    swagger_1.ApiOperation({ title: 'lista as linhas existentes' }),
    swagger_1.ApiResponse({ status: 200, description: 'Found.' }),
    swagger_1.ApiResponse({ status: 404, description: 'Not found.' }),
    __param(0, common_1.Param('linha')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HorariosController.prototype, "listarObs", null);
HorariosController = __decorate([
    common_1.Controller('horarios'),
    swagger_1.ApiUseTags('Horarios'),
    __metadata("design:paramtypes", [horario_service_1.HorariosService])
], HorariosController);
exports.HorariosController = HorariosController;
//# sourceMappingURL=horarios.controller.js.map