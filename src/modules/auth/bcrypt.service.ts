import { strict } from 'assert';
import { hash, compare } from 'bcrypt'

export class BcryptService {

    private salt = 10;

    async hash (plain: string):Promise<string> {
        return hash(plain, this.salt);
    }

    async compare (plain: string, encrypted: string):Promise<boolean> {
        return compare(plain, encrypted);
    }

}