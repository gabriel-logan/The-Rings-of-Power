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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubAuthService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("@nestjs/sequelize");
const constants_1 = require("../../global/constants");
const user_entity_1 = require("../../user/entities/user.entity");
let GithubAuthService = class GithubAuthService {
    constructor(userModel, jwtService, cacheManager) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.cacheManager = cacheManager;
    }
    async createNewUser(req) {
        const { username, email, githubUserId } = req.user;
        let newUser;
        try {
            newUser = await this.userModel.create({
                username,
                githubUserId,
                email: email || null,
                canSignWithEmailAndPassword: false,
            });
        }
        catch {
            throw new common_1.BadRequestException("Something went wrong creating the user");
        }
        const payload = {
            sub: newUser.id,
            username: newUser.username,
            email: newUser.email,
        };
        const accessToken = await this.jwtService.signAsync(payload);
        await this.cacheManager.del(constants_1.cacheKeys.users());
        return {
            accessToken: accessToken,
            userId: newUser.id,
            username: newUser.username,
            email: newUser.email,
        };
    }
    async signIn(req) {
        const { githubUserId } = req.user;
        const user = await this.userModel.findOne({
            where: { githubUserId },
        });
        if (!user) {
            return await this.createNewUser(req);
        }
        const payload = {
            sub: user.id,
            username: user.username,
            email: user.email,
        };
        const accessToken = await this.jwtService.signAsync(payload);
        return {
            accessToken: accessToken,
            userId: user.id,
            username: user.username,
            email: user.email,
        };
    }
};
exports.GithubAuthService = GithubAuthService;
exports.GithubAuthService = GithubAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService,
        cache_manager_1.Cache])
], GithubAuthService);
//# sourceMappingURL=github-auth.service.js.map