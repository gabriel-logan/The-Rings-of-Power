import { ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GithubReqUser } from "src/global/types";
declare const GithubAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GithubAuthGuard extends GithubAuthGuard_base {
    private readonly configService;
    constructor(configService: ConfigService);
    handleRequest<TUser = GithubReqUser["user"]>(err: Error | null, user: TUser | false, _info: never, context: ExecutionContext): TUser | void;
}
export {};
