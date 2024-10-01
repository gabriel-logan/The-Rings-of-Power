import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/entities/user.entity";
import { AuthDto } from "./dto/auth.dto";
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: typeof User, jwtService: JwtService);
    signIn(authDto: AuthDto): Promise<{
        accessToken: string;
        userId: number;
        username: string;
    }>;
}
