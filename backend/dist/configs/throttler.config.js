"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttlerGlobalConfig = void 0;
const constants_1 = require("../global/constants");
exports.throttlerGlobalConfig = {
    ttl: constants_1.throttler.global.ttl,
    limit: constants_1.throttler.global.limit,
    blockDuration: (context) => {
        const request = context.switchToHttp().getRequest();
        if (request.method === "POST" && request.url === "/user") {
            return constants_1.throttler.global.blockDuration.POST["/user"];
        }
        if (request.method === "DELETE") {
            return constants_1.throttler.global.blockDuration.DELETE;
        }
        if (request.method === "PUT") {
            return constants_1.throttler.global.blockDuration.PUT;
        }
        return constants_1.throttler.global.blockDuration.default;
    },
    skipIf: (context) => {
        const request = context.switchToHttp().getRequest();
        const isGetRequest = request.method === "GET";
        return isGetRequest;
    },
};
//# sourceMappingURL=throttler.config.js.map