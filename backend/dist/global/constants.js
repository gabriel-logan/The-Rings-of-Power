"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheKeys = void 0;
exports.cacheKeys = {
    users: () => "users",
    user: (userId) => `user_${userId}`,
    rings: (userId) => `rings_user_${userId}`,
    ring: (ringId, userId) => `ring_${ringId}_user_${userId}`,
};
//# sourceMappingURL=constants.js.map