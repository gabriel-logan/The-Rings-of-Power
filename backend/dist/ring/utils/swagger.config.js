"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApiOkResponse = exports.updateApiBody = exports.createApiOkResponse = exports.createApiBody = exports.findOneApiOkResponse = exports.findAllApiOkResponse = void 0;
const ringResponse = {
    id: 3,
    name: "Isildur's Bane",
    power: "Corrupts its bearer, leading to their downfall.",
    owner: "Isildur",
    forgedBy: "Homens",
    image: "uuid-id-originalname.png",
    userId: 2,
    updatedAt: "2024-10-05T06:09:30.870Z",
    createdAt: "2024-10-05T06:09:30.870Z",
    url: "http://localhost:3000/uploads/uuid-id-originalname.png",
};
const multipartFormData = {
    name: { type: "string", example: "Anel do Poder" },
    power: { type: "string", example: "Controlar todos os anéis" },
    owner: { type: "string", example: "Sauron" },
    forgedBy: { type: "string", example: "Sauron" },
    image: { type: "string", format: "binary" },
};
exports.findAllApiOkResponse = {
    isArray: true,
    example: [ringResponse],
};
exports.findOneApiOkResponse = {
    example: ringResponse,
};
exports.createApiBody = {
    description: "Create ring with image",
    schema: {
        type: "object",
        properties: multipartFormData,
    },
};
exports.createApiOkResponse = {
    example: ringResponse,
};
exports.updateApiBody = {
    description: "Update ring with image",
    schema: {
        type: "object",
        properties: multipartFormData,
    },
};
exports.updateApiOkResponse = {
    example: ringResponse,
};
//# sourceMappingURL=swagger.config.js.map