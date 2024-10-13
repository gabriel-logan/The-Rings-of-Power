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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var LocalUserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalUserService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const blob_1 = require("@vercel/blob");
const constants_1 = require("../../global/constants");
const ring_entity_1 = require("../../ring/entities/ring.entity");
const user_entity_1 = require("../entities/user.entity");
const UserGlobalValidations_1 = require("../utils/UserGlobalValidations");
let LocalUserService = LocalUserService_1 = class LocalUserService extends UserGlobalValidations_1.default {
    constructor(configService, userModel, cacheManager) {
        super();
        this.configService = configService;
        this.userModel = userModel;
        this.cacheManager = cacheManager;
        this.logger = new common_1.Logger(LocalUserService_1.name);
        this.atributesToShow = ["id", "username", "email"];
        this.includeAtributes = [
            {
                model: ring_entity_1.Ring,
                attributes: ["id", "name", "power", "owner", "forgedBy", "image", "url"],
            },
        ];
        this.blobReadWriteToken = this.configService.get("blobReadWriteToken");
    }
    async findAll() {
        const cachedUsers = await this.cacheManager.get(constants_1.cacheKeys.users());
        const notFoundMsg = "No users found";
        if (cachedUsers) {
            if (cachedUsers.length) {
                return cachedUsers;
            }
            throw new common_1.NotFoundException(notFoundMsg);
        }
        const users = await this.userModel.findAll({
            attributes: this.atributesToShow,
            include: this.includeAtributes,
        });
        await this.cacheManager.set(constants_1.cacheKeys.users(), users);
        if (users.length === 0) {
            throw new common_1.NotFoundException(notFoundMsg);
        }
        return users;
    }
    async findByPk(id) {
        const cachedUser = await this.cacheManager.get(constants_1.cacheKeys.user(id));
        const notFoundMsg = `User not found`;
        if (cachedUser) {
            if (cachedUser === "NotFound") {
                throw new common_1.NotFoundException(notFoundMsg);
            }
            return cachedUser;
        }
        const user = await this.userModel.findByPk(id, {
            attributes: this.atributesToShow,
            include: this.includeAtributes,
        });
        await this.cacheManager.set(constants_1.cacheKeys.user(id), user || "NotFound");
        if (!user) {
            throw new common_1.NotFoundException(notFoundMsg);
        }
        return user;
    }
    async findOne(email) {
        const notFoundMsg = `User with email ${email} not found`;
        const user = await this.userModel.findOne({
            where: { email },
            attributes: this.atributesToShow,
            include: this.includeAtributes,
        });
        if (!user) {
            throw new common_1.NotFoundException(notFoundMsg);
        }
        return user;
    }
    async create(user) {
        const { username, email, password } = user;
        if (!password.trim()) {
            throw new common_1.BadRequestException("Password can not be empty");
        }
        let newUser;
        try {
            newUser = await this.userModel.create({
                username,
                email,
                password,
                canSignWithEmailAndPassword: true,
            });
        }
        catch {
            throw new common_1.BadRequestException("User already exists");
        }
        await this.cacheManager.del(constants_1.cacheKeys.users());
        return {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
        };
    }
    async update(id, user, req) {
        const { username, email, password, newPassword } = user;
        const { sub } = req.user;
        this.validateUpdateOrDeleteUser({
            id,
            sub,
            msg: "You can not update this user",
        });
        const userToUpdate = await this.userModel.findByPk(id);
        if (!userToUpdate) {
            throw new common_1.NotFoundException(`User not found`);
        }
        if (password) {
            await this.validatePassword(userToUpdate, password);
        }
        else {
            throw new common_1.BadRequestException("Password is required");
        }
        if (newPassword) {
            this.validateNewPassword(newPassword, password);
            userToUpdate.password = newPassword;
        }
        else {
            userToUpdate.password = password;
        }
        userToUpdate.username = username || userToUpdate.username;
        userToUpdate.email = email || userToUpdate.email;
        try {
            await userToUpdate.save();
        }
        catch {
            throw new common_1.BadRequestException("User already exists");
        }
        await this.cacheManager.del(constants_1.cacheKeys.users());
        await this.cacheManager.del(constants_1.cacheKeys.user(id));
        return {
            id: userToUpdate.id,
            username: userToUpdate.username,
            email: userToUpdate.email,
        };
    }
    async delete(id, deleteUserDto, req) {
        const { password } = deleteUserDto;
        const { sub } = req.user;
        this.validateUpdateOrDeleteUser({
            id,
            sub,
            msg: "You can not delete this user",
        });
        const user = await this.userModel.findByPk(id, {
            include: [
                {
                    model: ring_entity_1.Ring,
                    attributes: ["id", "image"],
                },
            ],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User not found`);
        }
        await this.validatePassword(user, password);
        const deleteImagePromises = user.rings.map(async (ring) => {
            try {
                await (0, blob_1.del)(ring.image, {
                    token: this.blobReadWriteToken,
                });
            }
            catch (error) {
                this.logger.error(`Failed to delete image for ring ${ring.id}: ${error.message}`);
            }
        });
        await Promise.all(deleteImagePromises);
        await user.destroy();
        await this.cacheManager.del(constants_1.cacheKeys.users());
        await this.cacheManager.del(constants_1.cacheKeys.user(id));
        return null;
    }
};
exports.LocalUserService = LocalUserService;
exports.LocalUserService = LocalUserService = LocalUserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [config_1.ConfigService, Object, cache_manager_1.Cache])
], LocalUserService);
//# sourceMappingURL=local-user.service.js.map