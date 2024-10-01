import { ConfigService } from "@nestjs/config";
import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { ReqAuthUser } from "./types/Req";
export declare class UserService {
    private readonly userModel;
    private readonly configService;
    private readonly logger;
    private readonly atributesToShow;
    private readonly includeAtributes;
    private readonly host;
    private readonly port;
    private readonly nodeEnv;
    readonly baseUrl: string;
    private readonly blobReadWriteToken;
    constructor(userModel: typeof User, configService: ConfigService);
    findAll(): Promise<User[]>;
    findByPk(id: number): Promise<User>;
    findOne(username: CreateUserDto["username"]): Promise<User>;
    create(user: CreateUserDto): Promise<Pick<User, "id" | "username">>;
    update(id: number, user: UpdateUserDto, req: ReqAuthUser): Promise<Pick<User, "id" | "username">>;
    delete(id: number, deleteUserDto: DeleteUserDto, req: ReqAuthUser): Promise<null>;
}
