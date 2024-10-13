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
exports.LocalAuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_config_1 = require("../../global/swagger.config");
const auth_dto_1 = require("../dto/auth.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const local_auth_service_1 = require("../providers/local-auth.service");
const swagger_config_2 = require("../utils/swagger.config");
let LocalAuthController = class LocalAuthController {
    constructor(localAuthService) {
        this.localAuthService = localAuthService;
    }
    async signIn(authDto) {
        return await this.localAuthService.signIn(authDto);
    }
    getProfile(req) {
        return req.user;
    }
};
exports.LocalAuthController = LocalAuthController;
__decorate([
    (0, common_1.Post)("login"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)(swagger_config_2.signInApiOkResponse),
    (0, swagger_1.ApiResponse)(swagger_config_1.errorResponsePatternStructure),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], LocalAuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Get)("test"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("defaultBearerAuth"),
    (0, swagger_1.ApiOkResponse)(swagger_config_2.getProfileApiOkResponse),
    (0, swagger_1.ApiResponse)(swagger_config_1.errorResponsePatternStructure),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], LocalAuthController.prototype, "getProfile", null);
exports.LocalAuthController = LocalAuthController = __decorate([
    (0, common_1.Controller)("auth"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiTags)("Auth"),
    __metadata("design:paramtypes", [local_auth_service_1.LocalAuthService])
], LocalAuthController);
//# sourceMappingURL=local-auth.controller.js.map