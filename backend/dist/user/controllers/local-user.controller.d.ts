import type { ReqUser } from "src/global/types";
import { CreateUserDto } from "../dto/create-user.dto";
import { DeleteUserDto } from "../dto/delete-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";
import { LocalUserService } from "../providers/local-user.service";
export declare class LocalUserController {
    private readonly localUserService;
    constructor(localUserService: LocalUserService);
    findAll(): Promise<User[]>;
    findByPk(id: number): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<Pick<User, "id" | "username" | "email">>;
    update(id: number, updateUserDto: UpdateUserDto, req: ReqUser): Promise<Pick<User, "id" | "username" | "email">>;
    delete(id: number, deleteUserDto: DeleteUserDto, req: ReqUser): Promise<null>;
}
