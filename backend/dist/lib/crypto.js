"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = decrypt;
exports.encrypt = encrypt;
const crypto_1 = require("crypto");
function decrypt(hash, algorithm, secretKey) {
    const decipher = (0, crypto_1.createDecipheriv)(algorithm, secretKey, Buffer.from(hash.iv, "hex"));
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(hash.content, "hex")),
        decipher.final(),
    ]);
    return decrypted.toString();
}
function encrypt(text, algorithm, secretKey, ivSize) {
    const iv = (0, crypto_1.randomBytes)(ivSize);
    const cipher = (0, crypto_1.createCipheriv)(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString("hex"),
        content: encrypted.toString("hex"),
    };
}
//# sourceMappingURL=crypto.js.map