import { Model } from "sequelize-typescript";
import { Ring } from "src/ring/entities/ring.entity";
export declare class User extends Model {
    username: string;
    email: string | null;
    passwordHash: string | null;
    password: string;
    canSignWithEmailAndPassword: boolean;
    githubUserId: string | null;
    static hashPassword(instance: User): Promise<void>;
    passwordIsValid(password: string): Promise<boolean>;
    rings: Ring[];
}
