import type { User } from "../entities/user.entity";
export default class UserGlobalValidations {
    protected deleteRingImage(imageName: string): Promise<void>;
    protected validatePassword(user: User, password: string): Promise<void>;
    protected validateNewPassword(newPassword: string, oldPassword: string): void;
    protected validateUpdateOrDeleteUser({ id, sub, msg, }: {
        id: number;
        sub: number;
        msg: string;
    }): void;
}
