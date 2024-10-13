import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/entities/user.entity";
import { AuthDto } from "../dto/auth.dto";
import type { SignInResponse } from "../types/SignIn";
export declare class LocalAuthService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: typeof User, jwtService: JwtService);
    signIn(authDto: AuthDto): Promise<SignInResponse>;
}
