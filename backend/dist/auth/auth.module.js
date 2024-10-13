"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const sequelize_1 = require("@nestjs/sequelize");
const env_github_1 = require("../configs/env.github");
const user_entity_1 = require("../user/entities/user.entity");
const github_auth_controller_1 = require("./controllers/github-auth.controller");
const local_auth_controller_1 = require("./controllers/local-auth.controller");
const github_auth_service_1 = require("./providers/github-auth.service");
const local_auth_service_1 = require("./providers/local-auth.service");
const github_strategy_1 = require("../strategies/github.strategy");
const jwt_strategy_1 = require("../strategies/jwt.strategy");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forFeature(env_github_1.default),
            sequelize_1.SequelizeModule.forFeature([user_entity_1.User]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    secret: configService.get("token.secret"),
                    signOptions: { expiresIn: configService.get("token.expiration") },
                }),
                inject: [config_1.ConfigService],
            }),
            passport_1.PassportModule,
            cache_manager_1.CacheModule.register({
                ttl: 60000 * 10,
            }),
        ],
        controllers: [local_auth_controller_1.LocalAuthController, github_auth_controller_1.GithubAuthController],
        providers: [local_auth_service_1.LocalAuthService, jwt_strategy_1.JwtStrategy, github_strategy_1.GithubStrategy, github_auth_service_1.GithubAuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map