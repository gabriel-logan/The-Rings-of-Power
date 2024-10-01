import { Model } from "sequelize-typescript";
import { Ring } from "src/ring/entities/ring.entity";
export declare class User extends Model {
    username: string;
    passwordHash: string;
    password: string;
    static hashPassword(instance: User): Promise<void>;
    passwordIsValid(password: string): Promise<boolean>;
    rings: Ring[];
}
