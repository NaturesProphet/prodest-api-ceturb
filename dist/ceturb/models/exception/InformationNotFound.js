"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class InformationNotFound extends common_1.HttpException {
    constructor(mensagem) {
        super(mensagem, common_1.HttpStatus.NO_CONTENT);
    }
}
exports.InformationNotFound = InformationNotFound;
//# sourceMappingURL=InformationNotFound.js.map