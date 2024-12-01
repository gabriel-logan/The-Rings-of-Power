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
exports.GithubAuthController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const crypto_1 = require("../../lib/crypto");
const github_auth_guard_1 = require("../guards/github-auth.guard");
const github_auth_service_1 = require("../providers/github-auth.service");
let GithubAuthController = class GithubAuthController {
    constructor(configService, githubAuthService) {
        this.configService = configService;
        this.githubAuthService = githubAuthService;
    }
    githubSignIn() {
        return void 0;
    }
    async githubSignInCallback(req, res) {
        const response = await this.githubAuthService.signIn(req);
        const { accessToken, username, email, userId } = response;
        const clientUrl = this.configService.get("allowedOrigin");
        const payloadStringfied = JSON.stringify({
            accessToken,
            username,
            email,
            userId,
            fromServer: true,
        });
        const algorithm = "aes-256-ctr";
        const secretKey = this.configService.get("queryParams.secret");
        const ivSize = 16;
        const encryptedPayload = (0, crypto_1.encrypt)(payloadStringfied, algorithm, secretKey, ivSize);
        return res.redirect(clientUrl + "/login" + `?payload=${JSON.stringify(encryptedPayload)}`);
    }
};
exports.GithubAuthController = GithubAuthController;
__decorate([
    (0, common_1.Get)("github"),
    (0, common_1.UseGuards)(github_auth_guard_1.GithubAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GithubAuthController.prototype, "githubSignIn", null);
__decorate([
    (0, common_1.Get)("github/callback"),
    (0, common_1.UseGuards)(github_auth_guard_1.GithubAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GithubAuthController.prototype, "githubSignInCallback", null);
exports.GithubAuthController = GithubAuthController = __decorate([
    (0, common_1.Controller)("auth"),
    (0, swagger_1.ApiTags)("Auth/Github"),
    __metadata("design:paramtypes", [config_1.ConfigService,
        github_auth_service_1.GithubAuthService])
], GithubAuthController);
//# sourceMappingURL=github-auth.controller.js.map