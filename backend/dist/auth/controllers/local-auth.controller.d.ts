import type { ReqUser } from "src/global/types";
import { AuthDto } from "../dto/auth.dto";
import { LocalAuthService } from "../providers/local-auth.service";
import type { SignInResponse } from "../types/SignIn";
export declare class LocalAuthController {
    private readonly localAuthService;
    constructor(localAuthService: LocalAuthService);
    signIn(authDto: AuthDto): Promise<SignInResponse>;
    getProfile(req: ReqUser): ReqUser["user"];
}
