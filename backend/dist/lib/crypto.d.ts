import type { CipherKey } from "crypto";
export declare function decrypt(hash: {
    iv: string;
    content: string;
    hmac: string;
}, algorithm: Algorithm["name"], secretKey: CipherKey): string;
export declare function encrypt(text: string, algorithm: Algorithm["name"], secretKey: CipherKey, ivSize: number): {
    iv: string;
    content: string;
    hmac: string;
};
