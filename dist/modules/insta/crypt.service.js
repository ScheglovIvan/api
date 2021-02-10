"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptService = void 0;
const Cryptr = require('cryptr');
const cryptr = new Cryptr('string');
class CryptService {
    async cryptFunc(string) {
        return cryptr.encrypt(string);
    }
    async decryptFunc(string) {
        return cryptr.decrypt(string);
    }
}
exports.CryptService = CryptService;
//# sourceMappingURL=crypt.service.js.map