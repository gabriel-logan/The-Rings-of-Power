"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttler = exports.fileValidation = exports.cacheModuleOptions = exports.cacheTtl = exports.cacheKeys = void 0;
const throttler_1 = require("@nestjs/throttler");
exports.cacheKeys = {
    users: () => "users",
    user: (userId) => `user_${userId}`,
    rings: (userId) => `rings_user_${userId}`,
    ring: (ringId, userId) => `ring_${ringId}_user_${userId}`,
};
exports.cacheTtl = 60000 * 60;
exports.cacheModuleOptions = {
    ttl: exports.cacheTtl,
};
exports.fileValidation = {
    image: {
        size: {
            maxSize: 1024 * 500,
            message: "File is too large. Max size is 500KB",
        },
        allowedTypes: /jpeg|png/,
    },
};
exports.throttler = {
    global: {
        ttl: (0, throttler_1.seconds)(10),
        limit: 3,
        blockDuration: {
            POST: {
                "/user": (0, throttler_1.seconds)(8),
            },
            DELETE: (0, throttler_1.minutes)(1),
            PUT: (0, throttler_1.seconds)(15),
            default: (0, throttler_1.seconds)(20),
        },
    },
};
//# sourceMappingURL=constants.js.map