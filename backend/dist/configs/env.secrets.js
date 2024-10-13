"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    token: {
        secret: process.env.TOKEN_SECRET,
        expiration: process.env.TOKEN_EXPIRATION ?? "1d",
    },
    queryParams: {
        secret: process.env.QUERYPARAMS_OAUTH_PRIVATE_KEY,
        algorithm: process.env.QUERYPARAMS_OAUTH_ALGORITHM,
    },
});
//# sourceMappingURL=env.secrets.js.map