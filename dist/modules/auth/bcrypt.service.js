"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptService = void 0;
const bcrypt_1 = require("bcrypt");
class BcryptService {
    constructor() {
        this.salt = 10;
    }
    async hash(plain) {
        return bcrypt_1.hash(plain, this.salt);
    }
    async compare(plain, encrypted) {
        return bcrypt_1.compare(plain, encrypted);
    }
}
exports.BcryptService = BcryptService;
//# sourceMappingURL=bcrypt.service.js.map