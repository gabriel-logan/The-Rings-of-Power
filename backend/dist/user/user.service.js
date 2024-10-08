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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const blob_1 = require("@vercel/blob");
const ring_entity_1 = require("../ring/entities/ring.entity");
const user_entity_1 = require("./entities/user.entity");
let UserService = UserService_1 = class UserService {
    constructor(userModel, configService) {
        this.userModel = userModel;
        this.configService = configService;
        this.logger = new common_1.Logger(UserService_1.name);
        this.atributesToShow = ["id", "username"];
        this.includeAtributes = [
            {
                model: ring_entity_1.Ring,
                attributes: ["id", "name", "power", "owner", "forgedBy", "image"],
            },
        ];
        this.host = this.configService.get("host");
        this.port = this.configService.get("port");
        this.nodeEnv = this.configService.get("nodeEnv");
        this.baseUrl =
            this.nodeEnv === "development" ? `${this.host}:${this.port}` : this.host;
        this.blobReadWriteToken =
            this.configService.get("blobReadWriteToken");
    }
    async findAll() {
        const users = await this.userModel.findAll({
            attributes: this.atributesToShow,
            include: this.includeAtributes,
        });
        if (users.length === 0) {
            throw new common_1.NotFoundException("No users found");
        }
        users.forEach((user) => {
            user.rings.forEach((ring) => {
                ring.url = ring.image;
            });
        });
        return users;
    }
    async findByPk(id) {
        const user = await this.userModel.findByPk(id, {
            attributes: this.atributesToShow,
            include: this.includeAtributes,
        });
        this.logger.log(user);
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        user.rings.forEach((ring) => {
            ring.url = ring.image;
        });
        return user;
    }
    async findOne(username) {
        const user = await this.userModel.findOne({
            where: { username },
            attributes: this.atributesToShow,
            include: this.includeAtributes,
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with username ${username} not found`);
        }
        user.rings.forEach((ring) => {
            ring.url = ring.image;
        });
        return user;
    }
    async create(user) {
        const { username, password } = user;
        let newUser;
        try {
            newUser = await this.userModel.create({ username, password });
        }
        catch {
            throw new common_1.BadRequestException("Username already exists");
        }
        return {
            id: newUser.id,
            username: newUser.username,
        };
    }
    async update(id, user, req) {
        const { username, password, newPassword } = user;
        const { sub } = req.user;
        if (sub !== id) {
            throw new common_1.BadRequestException("You can not update this user");
        }
        const userToUpdate = await this.userModel.findByPk(id);
        if (!userToUpdate) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        if (password) {
            if (!(await userToUpdate.passwordIsValid(password))) {
                throw new common_1.BadRequestException("Invalid password");
            }
        }
        else {
            throw new common_1.BadRequestException("Password is required");
        }
        if (newPassword) {
            if (newPassword.length < 4) {
                throw new common_1.BadRequestException("Password must be at least 4 characters long");
            }
            if (newPassword.length > 255) {
                throw new common_1.BadRequestException("Password must be at most 255 characters long");
            }
            if (newPassword === password) {
                throw new common_1.BadRequestException("New password can not be the same as the old one");
            }
            userToUpdate.password = newPassword;
        }
        else {
            userToUpdate.password = password;
        }
        userToUpdate.username = username || userToUpdate.username;
        try {
            await userToUpdate.save();
        }
        catch {
            throw new common_1.BadRequestException("Username already exists");
        }
        return {
            id: userToUpdate.id,
            username: userToUpdate.username,
        };
    }
    async delete(id, deleteUserDto, req) {
        const { password } = deleteUserDto;
        const { sub } = req.user;
        if (sub !== id) {
            throw new common_1.BadRequestException("You can not delete this user");
        }
        const user = await this.userModel.findByPk(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        if (!(await user.passwordIsValid(password))) {
            throw new common_1.BadRequestException("Invalid password");
        }
        user.rings.forEach(async (ring) => {
            await (0, blob_1.del)(ring.image, {
                token: this.blobReadWriteToken,
            });
        });
        await user.destroy();
        return null;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map