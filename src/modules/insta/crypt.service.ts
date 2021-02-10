const Cryptr = require('cryptr');
const cryptr = new Cryptr('string');

export class CryptService {

    async cryptFunc(string) {
        return cryptr.encrypt(string);
    }

    async decryptFunc(string) {
        return cryptr.decrypt(string);
    }

}