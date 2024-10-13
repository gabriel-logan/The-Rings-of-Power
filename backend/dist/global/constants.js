"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileValidation = exports.cacheModuleOptions = exports.cacheTtl = exports.cacheKeys = void 0;
exports.cacheKeys = {
    users: () => "users",
    user: (userId) => `user_${userId}`,
    rings: (userId) => `rings_user_${userId}`,
    ring: (ringId, userId) => `ring_${ringId}_user_${userId}`,
};
exports.cacheTtl = 60000 * 10;
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
//# sourceMappingURL=constants.js.map