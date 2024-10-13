import { ConfigService } from "@nestjs/config";
import type { Response } from "express";
import type { GithubReqUser } from "src/global/types";
import { GithubAuthService } from "../providers/github-auth.service";
export declare class GithubAuthController {
    private readonly configService;
    private readonly githubAuthService;
    constructor(configService: ConfigService, githubAuthService: GithubAuthService);
    githubSignIn(): void;
    githubSignInCallback(req: GithubReqUser, res: Response): Promise<void>;
}
