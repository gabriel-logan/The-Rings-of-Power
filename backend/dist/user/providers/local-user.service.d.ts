import { Cache } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import type { ReqUser } from "src/global/types";
import { CreateUserDto } from "../dto/create-user.dto";
import { DeleteUserDto } from "../dto/delete-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";
import UserGlobalValidations from "../utils/UserGlobalValidations";
export declare class LocalUserService extends UserGlobalValidations {
    private readonly configService;
    private readonly userModel;
    private readonly cacheManager;
    private readonly logger;
    private readonly atributesToShow;
    private readonly includeAtributes;
    private readonly blobReadWriteToken;
    private readonly nodeEnv;
    constructor(configService: ConfigService, userModel: typeof User, cacheManager: Cache);
    findAll(): Promise<User[]>;
    findByPk(id: number): Promise<User>;
    findOne(email: CreateUserDto["email"]): Promise<User>;
    create(user: CreateUserDto): Promise<Pick<User, "id" | "username" | "email">>;
    update(id: number, user: UpdateUserDto, req: ReqUser): Promise<Pick<User, "id" | "username" | "email">>;
    delete(id: number, deleteUserDto: DeleteUserDto, req: ReqUser): Promise<null>;
}
