"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_ring_dto_1 = require("./create-ring.dto");
class UpdateRingDto extends (0, swagger_1.PartialType)(create_ring_dto_1.CreateRingDto) {
}
exports.UpdateRingDto = UpdateRingDto;
//# sourceMappingURL=update-ring.dto.js.map