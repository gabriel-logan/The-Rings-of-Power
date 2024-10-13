"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const constants_1 = require("../global/constants");
const github_user_controller_1 = require("./controllers/github-user.controller");
const local_user_controller_1 = require("./controllers/local-user.controller");
const user_entity_1 = require("./entities/user.entity");
const github_user_service_1 = require("./providers/github-user.service");
const local_user_service_1 = require("./providers/local-user.service");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([user_entity_1.User]),
            config_1.ConfigModule,
            cache_manager_1.CacheModule.register({
                ttl: constants_1.cacheTtl,
            }),
        ],
        controllers: [local_user_controller_1.LocalUserController, github_user_controller_1.GithubUserController],
        providers: [local_user_service_1.LocalUserService, github_user_service_1.GithubUserService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map