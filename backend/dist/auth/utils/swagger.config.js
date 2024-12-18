"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileApiOkResponse = exports.signInApiOkResponse = void 0;
const authResponse = {
    accessToken: "TOKEN_STRING",
    userId: 1,
    username: "admin",
    email: "admin@admin.com",
};
exports.signInApiOkResponse = {
    example: authResponse,
};
exports.getProfileApiOkResponse = {
    example: {
        sub: 1,
        username: "admin",
        email: "admin@admin.com",
    },
};
//# sourceMappingURL=swagger.config.js.map