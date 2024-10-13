export declare function decrypt(hash: {
    iv: string;
    content: string;
}, algorithm: Algorithm["name"], secretKey: string): string;
export declare function encrypt(text: string, algorithm: Algorithm["name"], secretKey: string, ivSize: number): {
    iv: string;
    content: string;
};
