import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { ReqAuthUser } from "./types/Req";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findByPk(id: number): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<Pick<User, "id" | "username">>;
    update(id: number, updateUserDto: UpdateUserDto, req: ReqAuthUser): Promise<Pick<User, "id" | "username">>;
    delete(id: number, deleteUserDto: DeleteUserDto, req: ReqAuthUser): Promise<null>;
}
