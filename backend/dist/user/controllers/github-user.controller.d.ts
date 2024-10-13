import { ReqUser } from "src/global/types";
import { DeleteUserGithubDto } from "../dto/delete-user.github.dto";
import { UpdateUserGithubDto } from "../dto/update-user.github.dto";
import { User } from "../entities/user.entity";
import { GithubUserService } from "../providers/github-user.service";
export declare class GithubUserController {
    private readonly githubUserService;
    constructor(githubUserService: GithubUserService);
    update(id: number, updateUserGithubDto: UpdateUserGithubDto, req: ReqUser): Promise<Pick<User, "id" | "username" | "email">>;
    delete(id: number, deleteUserGithubDto: DeleteUserGithubDto, req: ReqUser): Promise<null>;
}
