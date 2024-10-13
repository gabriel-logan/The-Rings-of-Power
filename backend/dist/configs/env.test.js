"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    nodeEnv: "test",
    allowedOrigin: "http://localhost:3001",
    host: "http://localhost",
    port: 3000,
    imagesUrl: "http://localhost:3000/uploads",
    github: {
        clientId: "github-client-id",
        clientSecret: "github-client-secret",
        callbackUrl: "http://localhost:3000/auth/github/callback",
    },
    token: {
        secret: "test",
        expiration: "1d",
    },
});
//# sourceMappingURL=env.test.js.map