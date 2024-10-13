import type { Ring } from "../entities/ring.entity";
import type { ForgedBy } from "../types/ForgedBy";
export default class RingGlobalValidations {
    private readonly destinationPath;
    private validateForgedByLimit;
    protected fieldsIsEmptyTrimmed({ name, power, owner, forgedBy, }: {
        name: string;
        power: string;
        owner: string;
        forgedBy: string;
    }): void;
    protected updateFieldsIsEmptyTrimmed({ name, power, owner, forgedBy, }: {
        name?: string;
        power?: string;
        owner?: string;
        forgedBy?: string;
    }): void;
    protected validateRingCreation(ringModel: typeof Ring, forgedBy: string, userId: number, ring?: Ring): Promise<void>;
    protected validateImageType(buffer: Express.Multer.File["buffer"]): Promise<void>;
    protected isValidRing(forgedBy: ForgedBy): boolean;
    protected generateNewUniqueImageName(originalname: string): string;
    protected saveRingImage(buffer: Express.Multer.File["buffer"], newUniqueImageName: string): Promise<void>;
    protected updateRingImage(file: Express.Multer.File, oldFileName: string): Promise<string>;
    protected deleteRingImage(imageName: string): Promise<void>;
}
