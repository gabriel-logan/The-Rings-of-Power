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
var RingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RingService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const blob_1 = require("@vercel/blob");
const constants_1 = require("../../global/constants");
const ring_entity_1 = require("../entities/ring.entity");
const RingGlobalValidations_1 = require("../utils/RingGlobalValidations");
let RingService = RingService_1 = class RingService extends RingGlobalValidations_1.default {
    constructor(configService, ringModel, cacheManager) {
        super();
        this.configService = configService;
        this.ringModel = ringModel;
        this.cacheManager = cacheManager;
        this.logger = new common_1.Logger(RingService_1.name);
        this.blobReadWriteToken = this.configService.get("blobReadWriteToken");
        this.nodeEnv = this.configService.get("nodeEnv");
    }
    async findAll(req) {
        const cachedRings = await this.cacheManager.get(constants_1.cacheKeys.rings(req.user.sub));
        const notFoundMsg = "No rings found";
        if (cachedRings) {
            if (cachedRings.length) {
                return cachedRings;
            }
            throw new common_1.NotFoundException(notFoundMsg);
        }
        const rings = await this.ringModel.findAll({
            where: {
                userId: req.user.sub,
            },
        });
        await this.cacheManager.set(constants_1.cacheKeys.rings(req.user.sub), rings);
        if (!rings.length) {
            throw new common_1.NotFoundException(notFoundMsg);
        }
        return rings;
    }
    async findOne(id, req) {
        const cachedRing = await this.cacheManager.get(constants_1.cacheKeys.ring(id, req.user.sub));
        const notFoundMsg = `Ring with id ${id} not found`;
        if (cachedRing) {
            if (cachedRing === "NotFound") {
                throw new common_1.NotFoundException(notFoundMsg);
            }
            return cachedRing;
        }
        const ring = await this.ringModel.findOne({
            where: {
                id: id,
                userId: req.user.sub,
            },
        });
        await this.cacheManager.set(constants_1.cacheKeys.ring(id, req.user.sub), ring || "NotFound");
        if (!ring) {
            throw new common_1.NotFoundException(notFoundMsg);
        }
        return ring;
    }
    async create(createRingDto, file, req) {
        const { name, power, owner, forgedBy } = createRingDto;
        this.fieldsIsEmptyTrimmed({ name, power, owner, forgedBy });
        await this.validateImageType(file.buffer);
        if (!this.isValidRing(forgedBy)) {
            throw new common_1.BadRequestException(`Invalid forgedBy value: ${forgedBy}`);
        }
        await this.validateRingCreation(this.ringModel, createRingDto.forgedBy, req.user.sub);
        let newRing;
        try {
            if (this.nodeEnv === "development") {
                const newImageName = this.generateNewUniqueImageName(file.originalname);
                newRing = await this.ringModel.create({
                    name,
                    power,
                    owner,
                    forgedBy,
                    image: newImageName,
                    userId: req.user.sub,
                });
                await this.saveRingImage(file.buffer, newImageName);
            }
            else {
                const blob = await (0, blob_1.put)(file.originalname, file.buffer, {
                    access: "public",
                    token: this.blobReadWriteToken,
                });
                newRing = await this.ringModel.create({
                    name,
                    power,
                    owner,
                    forgedBy,
                    image: blob.url,
                    userId: req.user.sub,
                });
            }
        }
        catch {
            throw new common_1.BadRequestException("Error creating ring");
        }
        await this.cacheManager.del(constants_1.cacheKeys.rings(req.user.sub));
        await this.cacheManager.del(constants_1.cacheKeys.users());
        await this.cacheManager.del(constants_1.cacheKeys.user(req.user.sub));
        return newRing;
    }
    async update(id, updateRingDto, file, req) {
        const { name, power, owner, forgedBy } = updateRingDto;
        this.updateFieldsIsEmptyTrimmed({ name, power, owner, forgedBy });
        if (forgedBy && !this.isValidRing(forgedBy)) {
            throw new common_1.BadRequestException(`Invalid forgedBy value: ${forgedBy}`);
        }
        const ring = await this.ringModel.findOne({
            where: {
                id: id,
                userId: req.user.sub,
            },
        });
        if (!ring) {
            throw new common_1.NotFoundException(`Ring with id ${id} not found`);
        }
        if (updateRingDto.forgedBy) {
            await this.validateRingCreation(this.ringModel, updateRingDto.forgedBy, req.user.sub, ring);
        }
        if (file) {
            if (this.nodeEnv === "development") {
                const imageSaved = await this.updateRingImage(file, ring.image);
                ring.image = imageSaved;
            }
            else {
                await this.validateImageType(file.buffer);
                await (0, blob_1.del)(ring.image, {
                    token: this.blobReadWriteToken,
                });
                const blob = await (0, blob_1.put)(file.originalname, file.buffer, {
                    access: "public",
                    token: this.blobReadWriteToken,
                });
                ring.image = blob.url;
            }
        }
        ring.name = name || ring.name;
        ring.power = power || ring.power;
        ring.owner = owner || ring.owner;
        ring.forgedBy = forgedBy || ring.forgedBy;
        await ring.save();
        await this.cacheManager.del(constants_1.cacheKeys.rings(req.user.sub));
        await this.cacheManager.del(constants_1.cacheKeys.ring(id, req.user.sub));
        await this.cacheManager.del(constants_1.cacheKeys.users());
        await this.cacheManager.del(constants_1.cacheKeys.user(req.user.sub));
        return ring;
    }
    async delete(id, req) {
        const ring = await this.ringModel.findOne({
            where: {
                id: id,
                userId: req.user.sub,
            },
        });
        if (!ring) {
            throw new common_1.NotFoundException(`Ring with id ${id} not found`);
        }
        if (this.nodeEnv === "development") {
            await this.deleteRingImage(ring.image);
        }
        else {
            try {
                await (0, blob_1.del)(ring.image, {
                    token: this.blobReadWriteToken,
                });
            }
            catch (error) {
                this.logger.error(`Failed to delete image for ring ${id}: ${error.message}`);
                throw new common_1.BadRequestException(`Failed to delete image for ring`);
            }
        }
        await ring.destroy();
        await this.cacheManager.del(constants_1.cacheKeys.rings(req.user.sub));
        await this.cacheManager.del(constants_1.cacheKeys.ring(id, req.user.sub));
        await this.cacheManager.del(constants_1.cacheKeys.users());
        await this.cacheManager.del(constants_1.cacheKeys.user(req.user.sub));
        return null;
    }
};
exports.RingService = RingService;
exports.RingService = RingService = RingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, sequelize_1.InjectModel)(ring_entity_1.Ring)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [config_1.ConfigService, Object, cache_manager_1.Cache])
], RingService);
//# sourceMappingURL=ring.service.js.map