import { Cache } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import type { ReqUser } from "src/global/types";
import { DeleteUserGithubDto } from "../dto/delete-user.github.dto";
import { UpdateUserGithubDto } from "../dto/update-user.github.dto";
import { User } from "../entities/user.entity";
import UserGlobalValidations from "../utils/UserGlobalValidations";
export declare class GithubUserService extends UserGlobalValidations {
    private readonly configService;
    private readonly userModel;
    private readonly cacheManager;
    private readonly logger;
    private readonly blobReadWriteToken;
    private readonly nodeEnv;
    constructor(configService: ConfigService, userModel: typeof User, cacheManager: Cache);
    update(id: number, user: UpdateUserGithubDto, req: ReqUser): Promise<Pick<User, "id" | "username" | "email">>;
    delete(id: number, deleteUserDto: DeleteUserGithubDto, req: ReqUser): Promise<null>;
}
