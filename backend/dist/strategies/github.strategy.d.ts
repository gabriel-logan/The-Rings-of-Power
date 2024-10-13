import { ConfigService } from "@nestjs/config";
import { type Profile, Strategy } from "passport-github2";
import { GithubReqUser } from "src/global/types";
declare const GithubStrategy_base: new (...args: any[]) => Strategy;
export declare class GithubStrategy extends GithubStrategy_base {
    constructor(configService: ConfigService);
    validate(_accessToken: string, _refreshToken: string, profile: Profile): GithubReqUser["user"];
}
export {};
