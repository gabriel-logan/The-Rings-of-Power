import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(authDto: AuthDto): Promise<{
        accessToken: string;
        userId: number;
        username: string;
    }>;
    getProfile(req: {
        user: {
            sub: number;
            username: string;
        };
    }): {
        sub: number;
        username: string;
    };
}
