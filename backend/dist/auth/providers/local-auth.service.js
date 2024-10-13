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
exports.LocalAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("@nestjs/sequelize");
const user_entity_1 = require("../../user/entities/user.entity");
let LocalAuthService = class LocalAuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signIn(authDto) {
        const user = await this.userModel.findOne({
            where: { email: authDto.email },
        });
        if (!user ||
            !user.canSignWithEmailAndPassword ||
            !(await user.passwordIsValid(authDto.password))) {
            throw new common_1.UnauthorizedException("User or password incorrect");
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
exports.LocalAuthService = LocalAuthService;
exports.LocalAuthService = LocalAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], LocalAuthService);
//# sourceMappingURL=local-auth.service.js.map