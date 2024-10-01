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
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const blob_1 = require("@vercel/blob");
const RingGlobalValidations_1 = require("./RingGlobalValidations");
const ring_entity_1 = require("./entities/ring.entity");
let RingService = RingService_1 = class RingService extends RingGlobalValidations_1.default {
    constructor(ringModel, configService) {
        super();
        this.ringModel = ringModel;
        this.configService = configService;
        this.logger = new common_1.Logger(RingService_1.name);
        this.host = this.configService.get("host");
        this.port = this.configService.get("port");
        this.nodeEnv = this.configService.get("nodeEnv");
        this.baseUrl =
            this.nodeEnv === "development" ? `${this.host}:${this.port}` : this.host;
        this.blobReadWriteToken =
            this.configService.get("blobReadWriteToken");
    }
    async findAll(req) {
        const rings = await this.ringModel.findAll({
            where: {
                userId: req.user.sub,
            },
        });
        if (!rings.length) {
            throw new common_1.NotFoundException("No rings found");
        }
        rings.forEach((ring) => {
            ring.url = ring.image;
        });
        return rings;
    }
    async findOne(id, req) {
        const ring = await this.ringModel.findOne({
            where: {
                id: id,
                userId: req.user.sub,
            },
        });
        if (!ring) {
            throw new common_1.NotFoundException(`Ring with id ${id} not found`);
        }
        ring.url = ring.image;
        return ring;
    }
    async create(createRingDto, file, req) {
        const { name, power, owner, forgedBy } = createRingDto;
        if (!this.isValidRing(forgedBy)) {
            throw new common_1.BadRequestException(`Invalid forgedBy value: ${forgedBy}`);
        }
        await this.validateRingCreation(this.ringModel, createRingDto.forgedBy, req.user.sub);
        const blob = await (0, blob_1.put)(file.originalname, file.buffer, {
            access: "public",
            token: this.blobReadWriteToken,
        });
        let newRing;
        try {
            newRing = await this.ringModel.create({
                name,
                power,
                owner,
                forgedBy,
                image: blob.url,
                userId: req.user.sub,
            });
        }
        catch {
            throw new common_1.BadRequestException("Error creating ring");
        }
        newRing.url = blob.url;
        return newRing;
    }
    async update(id, updateRingDto, file, req) {
        const { name, power, owner, forgedBy } = updateRingDto;
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
            const blob = await (0, blob_1.put)(file.originalname, file.buffer, {
                access: "public",
                token: this.blobReadWriteToken,
            });
            ring.image = blob.url;
            ring.url = blob.url;
        }
        ring.name = name || ring.name;
        ring.power = power || ring.power;
        ring.owner = owner || ring.owner;
        ring.forgedBy = forgedBy || ring.forgedBy;
        await ring.save();
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
        await ring.destroy();
        await (0, blob_1.del)(ring.image, {
            token: this.blobReadWriteToken,
        });
        return null;
    }
};
exports.RingService = RingService;
exports.RingService = RingService = RingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(ring_entity_1.Ring)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService])
], RingService);
//# sourceMappingURL=ring.service.js.map