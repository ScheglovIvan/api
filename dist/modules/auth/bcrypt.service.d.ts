export declare class BcryptService {
    private salt;
    hash(plain: string): Promise<string>;
    compare(plain: string, encrypted: string): Promise<boolean>;
}
