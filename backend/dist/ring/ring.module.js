"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RingModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("@nestjs/sequelize");
const ring_entity_1 = require("./entities/ring.entity");
const ring_controller_1 = require("./ring.controller");
const ring_service_1 = require("./ring.service");
let RingModule = class RingModule {
};
exports.RingModule = RingModule;
exports.RingModule = RingModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([ring_entity_1.Ring]), config_1.ConfigModule, jwt_1.JwtModule],
        controllers: [ring_controller_1.RingController],
        providers: [ring_service_1.RingService],
    })
], RingModule);
//# sourceMappingURL=ring.module.js.map