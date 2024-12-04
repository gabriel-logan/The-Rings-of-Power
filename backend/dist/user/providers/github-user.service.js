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
var GithubUserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubUserService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const blob_1 = require("@vercel/blob");
const constants_1 = require("../../global/constants");
const ring_entity_1 = require("../../ring/entities/ring.entity");
const user_entity_1 = require("../entities/user.entity");
const UserGlobalValidations_1 = require("../utils/UserGlobalValidations");
let GithubUserService = GithubUserService_1 = class GithubUserService extends UserGlobalValidations_1.default {
    constructor(configService, userModel, cacheManager) {
        super();
        this.configService = configService;
        this.userModel = userModel;
        this.cacheManager = cacheManager;
        this.logger = new common_1.Logger(GithubUserService_1.name);
        this.blobReadWriteToken = this.configService.get("blobReadWriteToken");
        this.nodeEnv = this.configService.get("nodeEnv");
    }
    async update(id, user, req) {
        const { username } = user;
        const { sub } = req.user;
        this.validateUpdateOrDeleteUser({
            id,
            sub,
            msg: "You can not update this user",
        });
        const userToUpdate = await this.userModel.findByPk(id);
        if (!userToUpdate?.githubUserId) {
            throw new common_1.BadRequestException("User is not a Github user");
        }
        userToUpdate.username = username || userToUpdate.username;
        await userToUpdate.save();
        await this.cacheManager.del(constants_1.cacheKeys.users());
        await this.cacheManager.del(constants_1.cacheKeys.user(id));
        return {
            id: userToUpdate.id,
            username: userToUpdate.username,
            email: userToUpdate.email,
        };
    }
    async delete(id, deleteUserDto, req) {
        const { confirm } = deleteUserDto;
        if (!confirm) {
            throw new common_1.BadRequestException("You must confirm the deletion");
        }
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
        if (!user?.githubUserId) {
            throw new common_1.BadRequestException("User is not a Github user");
        }
        let deleteImagesPromises = [];
        if (this.nodeEnv === "development") {
            deleteImagesPromises = user.rings.map(async (ring) => {
                await this.deleteRingImage(ring.image);
            });
        }
        else {
            deleteImagesPromises = user.rings.map(async (ring) => {
                try {
                    await (0, blob_1.del)(ring.image, {
                        token: this.blobReadWriteToken,
                    });
                }
                catch (error) {
                    this.logger.error(`Failed to delete image for ring ${ring.id}: ${error.message}`);
                }
            });
        }
        await Promise.all(deleteImagesPromises);
        await user.destroy();
        await this.cacheManager.del(constants_1.cacheKeys.users());
        await this.cacheManager.del(constants_1.cacheKeys.user(id));
        return null;
    }
};
exports.GithubUserService = GithubUserService;
exports.GithubUserService = GithubUserService = GithubUserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [config_1.ConfigService, Object, cache_manager_1.Cache])
], GithubUserService);
//# sourceMappingURL=github-user.service.js.map