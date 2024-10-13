"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
class UserGlobalValidations {
    async deleteRingImage(imageName) {
        const destinationPath = (0, path_1.join)(process.cwd(), "uploads");
        const filePath = (0, path_1.join)(destinationPath, imageName);
        if (await (0, fs_1.existsSync)(filePath)) {
            (0, fs_1.unlinkSync)(filePath);
        }
    }
    async validatePassword(user, password) {
        const msg = "Invalid password";
        try {
            if (!password.trim() || !(await user.passwordIsValid(password))) {
                throw new common_1.BadRequestException(msg);
            }
        }
        catch {
            throw new common_1.BadRequestException(msg);
        }
    }
    validateNewPassword(newPassword, oldPassword) {
        if (!newPassword.trim()) {
            throw new common_1.BadRequestException("New password when provided can not be empty");
        }
        if (newPassword.length < 4) {
            throw new common_1.BadRequestException("Password must be at least 4 characters long");
        }
        if (newPassword.length > 255) {
            throw new common_1.BadRequestException("Password must be at most 255 characters long");
        }
        if (newPassword === oldPassword) {
            throw new common_1.BadRequestException("New password can not be the same as the old one");
        }
    }
    validateUpdateOrDeleteUser({ id, sub, msg, }) {
        if (sub !== id) {
            throw new common_1.BadRequestException(msg);
        }
    }
}
exports.default = UserGlobalValidations;
//# sourceMappingURL=UserGlobalValidations.js.map