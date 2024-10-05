"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const multiform_validator_1 = require("multiform-validator");
const path_1 = require("path");
const uuid_1 = require("uuid");
class RingGlobalValidations {
    async validateForgedByLimit(ringModel, forgedBy, userId) {
        if (forgedBy === "Elfos") {
            const elfosRings = await ringModel.count({ where: { forgedBy, userId } });
            if (elfosRings >= 3) {
                throw new common_1.BadRequestException(`Elfos can't forge more than 3 rings`);
            }
        }
        if (forgedBy === "Anões") {
            const anoesRings = await ringModel.count({ where: { forgedBy, userId } });
            if (anoesRings >= 7) {
                throw new common_1.BadRequestException(`Anões can't forge more than 7 rings`);
            }
        }
        if (forgedBy === "Homens") {
            const homensRings = await ringModel.count({
                where: { forgedBy, userId },
            });
            if (homensRings >= 9) {
                throw new common_1.BadRequestException(`Homens can't forge more than 9 rings`);
            }
        }
        if (forgedBy === "Sauron") {
            const sauronRings = await ringModel.count({
                where: { forgedBy, userId },
            });
            if (sauronRings >= 1) {
                throw new common_1.BadRequestException(`Sauron can't forge more than 1 ring`);
            }
        }
    }
    async validateRingCreation(ringModel, forgedBy, userId, ring) {
        if (ring) {
            if (ring.forgedBy !== forgedBy) {
                await this.validateForgedByLimit(ringModel, forgedBy, userId);
            }
            return;
        }
        await this.validateForgedByLimit(ringModel, forgedBy, userId);
    }
    isValidRing(forgedBy) {
        return ["Elfos", "Anões", "Homens", "Sauron"].includes(forgedBy);
    }
    async saveOrUpdateRingImage(file, { isUpdate, oldFileName } = {
        isUpdate: false,
        oldFileName: "",
    }) {
        if (isUpdate && !oldFileName) {
            throw new Error("oldFileName must be provided when isUpdate is true");
        }
        const destinationPath = (0, path_1.join)(process.cwd(), "uploads");
        const newUniqueImageName = `${(0, uuid_1.v4)()}-${Date.now()}-${file.originalname}`;
        const filePath = (0, path_1.join)(destinationPath, newUniqueImageName);
        if (await !(0, fs_1.existsSync)(destinationPath)) {
            (0, fs_1.mkdirSync)(destinationPath);
        }
        if (isUpdate) {
            await this.deleteRingImage(oldFileName);
        }
        const bufferImageData = Buffer.from(file.buffer);
        if (!(0, multiform_validator_1.isValidImage)(bufferImageData)) {
            throw new common_1.BadRequestException("Validation failed (expected type is /jpeg|png/)");
        }
        (0, fs_1.writeFileSync)(filePath, bufferImageData);
        return newUniqueImageName;
    }
    async deleteRingImage(imageName) {
        const destinationPath = (0, path_1.join)(process.cwd(), "uploads");
        const filePath = (0, path_1.join)(destinationPath, imageName);
        if (await (0, fs_1.existsSync)(filePath)) {
            (0, fs_1.unlinkSync)(filePath);
        }
    }
}
exports.default = RingGlobalValidations;
//# sourceMappingURL=RingGlobalValidations.js.map