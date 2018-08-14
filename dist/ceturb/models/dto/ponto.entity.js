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
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
class Ponto {
    constructor(id, codigo, municipio, logradouro, referencia, latitude, longitude, azimute, terminal) {
        this.id = id;
        this.codigo = codigo;
        this.municipio = municipio;
        this.logradouro = logradouro;
        this.referencia = referencia;
        this.latitude = latitude;
        this.longitude = longitude;
        this.azimute = azimute;
        this.terminal = terminal;
    }
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], Ponto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], Ponto.prototype, "codigo", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], Ponto.prototype, "municipio", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], Ponto.prototype, "logradouro", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], Ponto.prototype, "referencia", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], Ponto.prototype, "latitude", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], Ponto.prototype, "longitude", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], Ponto.prototype, "azimute", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], Ponto.prototype, "terminal", void 0);
exports.Ponto = Ponto;
//# sourceMappingURL=ponto.entity.js.map