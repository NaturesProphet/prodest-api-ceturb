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
let DefaultController = class DefaultController {
    default() {
        return __awaiter(this, void 0, void 0, function* () {
            return "Pocando!";
        });
    }
    noGetRoutes() {
        return __awaiter(this, void 0, void 0, function* () {
            return "<html><body>404<br><img src = 'https://okpotatodotcom.files.wordpress.com/2014/12/gandalf-lost.gif'></html></body>";
        });
    }
};
__decorate([
    common_1.Get("/"),
    swagger_1.ApiOperation({
        description: "Retorna uma mensagem de estado de saude da API dO_Ob",
        title: "Pocando!"
    }),
    swagger_1.ApiResponse({ status: 200, description: "Retorna mensagem 'Pocando!'" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DefaultController.prototype, "default", null);
__decorate([
    common_1.Get('*'),
    swagger_1.ApiOperation({ title: 'rota para endpoints inexistentes (404)' }),
    swagger_1.ApiResponse({ status: 404, description: 'Nao tem nada para ser visto aqui' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DefaultController.prototype, "noGetRoutes", null);
DefaultController = __decorate([
    common_1.Controller(),
    swagger_1.ApiUseTags('Estamos Vivos!')
], DefaultController);
exports.DefaultController = DefaultController;
//# sourceMappingURL=default.controller.js.map