"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = decrypt;
exports.encrypt = encrypt;
const crypto_1 = require("crypto");
function generateHmac(secretKey, data) {
    return (0, crypto_1.createHmac)("sha256", secretKey).update(data).digest("hex");
}
function decrypt(hash, algorithm, secretKey) {
    const computedHmac = generateHmac(secretKey, hash.iv + hash.content);
    if (computedHmac !== hash.hmac) {
        throw new Error("Data integrity check failed! Data has been tampered with.");
    }
    try {
        const decipher = (0, crypto_1.createDecipheriv)(algorithm, secretKey, Buffer.from(hash.iv, "hex"));
        const decrypted = Buffer.concat([
            decipher.update(Buffer.from(hash.content, "hex")),
            decipher.final(),
        ]);
        return decrypted.toString();
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error("Decryption failed: " + err.message);
        }
        throw new Error("Decryption failed: Unknown error");
    }
}
function encrypt(text, algorithm, secretKey, ivSize) {
    const iv = (0, crypto_1.randomBytes)(ivSize);
    const cipher = (0, crypto_1.createCipheriv)(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    const hmac = generateHmac(secretKey, iv.toString("hex") + encrypted.toString("hex"));
    return {
        iv: iv.toString("hex"),
        content: encrypted.toString("hex"),
        hmac,
    };
}
//# sourceMappingURL=crypto.js.map