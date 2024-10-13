import { Cache } from "@nestjs/cache-manager";
import { JwtService } from "@nestjs/jwt";
import type { GithubReqUser } from "src/global/types";
import { User } from "src/user/entities/user.entity";
import type { SignInResponse } from "../types/SignIn";
export declare class GithubAuthService {
    private readonly userModel;
    private readonly jwtService;
    private readonly cacheManager;
    constructor(userModel: typeof User, jwtService: JwtService, cacheManager: Cache);
    createNewUser(req: GithubReqUser): Promise<SignInResponse>;
    signIn(req: GithubReqUser): Promise<SignInResponse>;
}
