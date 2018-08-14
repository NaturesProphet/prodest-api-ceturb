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
class Agencia {
    constructor() {
        this.agency_id = 1;
        this.agency_name = "CETURB/ES";
        this.agency_timezone = "America/Sao_Paulo";
        this.agency_url = "https://ceturb.es.gov.br/";
        this.agency_lang = "pt";
        this.agency_phone = "+55 27 3232 4500";
    }
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], Agencia.prototype, "agency_id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], Agencia.prototype, "agency_name", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], Agencia.prototype, "agency_timezone", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], Agencia.prototype, "agency_url", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], Agencia.prototype, "agency_lang", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], Agencia.prototype, "agency_phone", void 0);
exports.Agencia = Agencia;
//# sourceMappingURL=agencia.model.Dto.js.map