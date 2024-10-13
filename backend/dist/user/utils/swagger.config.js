"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApiOkResponse = exports.createApiOkResponse = exports.findOneApiOkResponse = exports.findAllApiOkResponse = void 0;
const userResponseGet = {
    id: 1,
    username: "admin",
    email: "admin@admin.com",
    rings: [
        {
            id: 4,
            name: "Isildur's Bane",
            power: "Isildur's Bane",
            owner: "Isildur's Bane",
            forgedBy: "Elfos",
            image: "uuid-id-originalname.png",
            url: "http://localhost:3000/uploads/uuid-id-originalname.png",
        },
    ],
};
const userResponseCreateOrUpdate = {
    id: 1,
    username: "admin",
    email: "admin@admin.com",
};
exports.findAllApiOkResponse = {
    isArray: true,
    example: [userResponseGet],
};
exports.findOneApiOkResponse = {
    example: userResponseGet,
};
exports.createApiOkResponse = {
    example: userResponseCreateOrUpdate,
};
exports.updateApiOkResponse = {
    example: userResponseCreateOrUpdate,
};
//# sourceMappingURL=swagger.config.js.map