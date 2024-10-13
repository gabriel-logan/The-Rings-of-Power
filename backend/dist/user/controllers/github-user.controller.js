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
exports.GithubUserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const swagger_config_1 = require("../../global/swagger.config");
const delete_user_github_dto_1 = require("../dto/delete-user.github.dto");
const update_user_github_dto_1 = require("../dto/update-user.github.dto");
const github_user_service_1 = require("../providers/github-user.service");
const swagger_config_2 = require("../utils/swagger.config");
let GithubUserController = class GithubUserController {
    constructor(githubUserService) {
        this.githubUserService = githubUserService;
    }
    async update(id, updateUserGithubDto, req) {
        return await this.githubUserService.update(id, updateUserGithubDto, req);
    }
    async delete(id, deleteUserGithubDto, req) {
        return await this.githubUserService.delete(id, deleteUserGithubDto, req);
    }
};
exports.GithubUserController = GithubUserController;
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("defaultBearerAuth"),
    (0, swagger_1.ApiOkResponse)(swagger_config_2.updateApiOkResponse),
    (0, swagger_1.ApiResponse)(swagger_config_1.errorResponsePatternStructure),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_github_dto_1.UpdateUserGithubDto, Object]),
    __metadata("design:returntype", Promise)
], GithubUserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("defaultBearerAuth"),
    (0, swagger_1.ApiOkResponse)({
        description: "No body returned for response",
    }),
    (0, swagger_1.ApiResponse)(swagger_config_1.errorResponsePatternStructure),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, delete_user_github_dto_1.DeleteUserGithubDto, Object]),
    __metadata("design:returntype", Promise)
], GithubUserController.prototype, "delete", null);
exports.GithubUserController = GithubUserController = __decorate([
    (0, common_1.Controller)("user/github"),
    (0, swagger_1.ApiTags)("User/Github"),
    __metadata("design:paramtypes", [github_user_service_1.GithubUserService])
], GithubUserController);
//# sourceMappingURL=github-user.controller.js.map