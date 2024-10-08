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
exports.RingController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const swagger_config_1 = require("../swagger.config");
const create_ring_dto_1 = require("./dto/create-ring.dto");
const update_ring_dto_1 = require("./dto/update-ring.dto");
const ring_service_1 = require("./ring.service");
const swagger_config_2 = require("./swagger.config");
let RingController = class RingController {
    constructor(ringService) {
        this.ringService = ringService;
    }
    async findAll(req) {
        return await this.ringService.findAll(req);
    }
    async findOne(id, req) {
        return await this.ringService.findOne(id, req);
    }
    async create(createRingDto, file, req) {
        const ring = await this.ringService.create(createRingDto, file, req);
        return ring;
    }
    async update(updateRingDto, id, file, req) {
        const ring = await this.ringService.update(id, updateRingDto, file, req);
        return ring;
    }
    async delete(id, req) {
        const ring = await this.ringService.delete(id, req);
        return ring;
    }
};
exports.RingController = RingController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)(swagger_config_2.findAllApiOkResponse),
    (0, swagger_1.ApiResponse)(swagger_config_1.errorResponsePatternStructure),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOkResponse)(swagger_config_2.findOneApiOkResponse),
    (0, swagger_1.ApiResponse)(swagger_config_1.errorResponsePatternStructure),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image")),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)(swagger_config_2.createApiBody),
    (0, swagger_1.ApiCreatedResponse)(swagger_config_2.createApiOkResponse),
    (0, swagger_1.ApiResponse)(swagger_config_1.errorResponsePatternStructure),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: /jpeg|png/,
    })
        .addMaxSizeValidator({
        maxSize: 1024 * 500,
    })
        .build())),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ring_dto_1.CreateRingDto, Object, Object]),
    __metadata("design:returntype", Promise)
], RingController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image")),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)(swagger_config_2.updateApiBody),
    (0, swagger_1.ApiOkResponse)(swagger_config_2.updateApiOkResponse),
    (0, swagger_1.ApiResponse)(swagger_config_1.errorResponsePatternStructure),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: /jpeg|png/,
    })
        .addMaxSizeValidator({
        maxSize: 1024 * 500,
    })
        .build({ fileIsRequired: false }))),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_ring_dto_1.UpdateRingDto, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], RingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOkResponse)({
        description: "No body returned for response",
    }),
    (0, swagger_1.ApiResponse)(swagger_config_1.errorResponsePatternStructure),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RingController.prototype, "delete", null);
exports.RingController = RingController = __decorate([
    (0, common_1.Controller)("ring"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiTags)("Ring"),
    (0, swagger_1.ApiBearerAuth)("defaultBearerAuth"),
    __metadata("design:paramtypes", [ring_service_1.RingService])
], RingController);
//# sourceMappingURL=ring.controller.js.map