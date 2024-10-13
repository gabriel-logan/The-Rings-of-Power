import type { ReqUser } from "src/global/types";
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    handleRequest<TUser = ReqUser["user"]>(err: Error | null, user: TUser | false, info: Error | undefined): TUser;
}
export {};
