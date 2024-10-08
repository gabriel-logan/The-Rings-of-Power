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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const swagger_config_1 = require("../swagger.config");
const create_user_dto_1 = require("./dto/create-user.dto");
const delete_user_dto_1 = require("./dto/delete-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const swagger_config_2 = require("./swagger.config");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findAll() {
        return await this.userService.findAll();
    }
    async findByPk(id) {
        return await this.userService.findByPk(id);
    }
    async create(createUserDto) {
        const user = await this.userService.create(createUserDto);
        return user;
    }
    async update(id, updateUserDto, req) {
        const user = await this.userService.update(id, updateUserDto, req);
        return user;
    }
    async delete(id, deleteUserDto, req) {
        const user = await this.userService.delete(id, deleteUserDto, req);
        return user;
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)(swagger_config_2.findAllApiOkResponse),
    (0, swagger_1.ApiResponse)(swagger_config_1.errorResponsePatternStructure),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOkResponse)(swagger_config_2.findOneApiOkResponse),
    (0, swagger_1.ApiResponse)(swagger_config_1.errorResponsePatternStructure),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByPk", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)(swagger_config_2.createApiOkResponse),
    (0, swagger_1.ApiResponse)(swagger_config_1.errorResponsePatternStructure),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)("defaultBearerAuth"),
    (0, swagger_1.ApiOkResponse)(swagger_config_2.updateApiOkResponse),
    (0, swagger_1.ApiResponse)(swagger_config_1.errorResponsePatternStructure),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)("defaultBearerAuth"),
    (0, swagger_1.ApiOkResponse)({
        description: "No body returned for response",
    }),
    (0, swagger_1.ApiResponse)(swagger_config_1.errorResponsePatternStructure),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, delete_user_dto_1.DeleteUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("user"),
    (0, swagger_1.ApiTags)("User"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map