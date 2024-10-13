import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import type { JwtPayload, ReqUser } from "src/global/types";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): ReqUser["user"];
}
export {};
