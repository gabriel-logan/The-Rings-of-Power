"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt = require("bcrypt");
const sequelize_typescript_1 = require("sequelize-typescript");
const ring_entity_1 = require("../../ring/entities/ring.entity");
let User = class User extends sequelize_typescript_1.Model {
    static async hashPassword(instance) {
        if (instance.password) {
            const newPassword = await bcrypt.hash(instance.password, 8);
            instance.passwordHash = newPassword;
        }
    }
    async passwordIsValid(password) {
        if (!this.passwordHash) {
            return false;
        }
        const compare = await bcrypt.compare(password, this.passwordHash);
        return compare;
    }
};
exports.User = User;
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    sequelize_typescript_1.IsEmail,
    (0, sequelize_typescript_1.Column)({
        unique: true,
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", Object)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", Object)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.VIRTUAL,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "canSignWithEmailAndPassword", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", Object)
], User.prototype, "githubUserId", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ring_entity_1.Ring, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", Array)
], User.prototype, "rings", void 0);
__decorate([
    (0, sequelize_typescript_1.BeforeSave)({ name: "hashPassword" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "hashPassword", null);
exports.User = User = __decorate([
    sequelize_typescript_1.Table
], User);
//# sourceMappingURL=user.entity.js.map