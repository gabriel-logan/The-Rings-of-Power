import type { Ring } from "./entities/ring.entity";
import type { ForgedBy } from "./types/ForgedBy";
export default class RingGlobalValidations {
    private readonly destinationPath;
    private validateForgedByLimit;
    protected validateRingCreation(ringModel: typeof Ring, forgedBy: string, userId: number, ring?: Ring): Promise<void>;
    protected isValidRing(forgedBy: ForgedBy): boolean;
    protected validateImageType(buffer: Express.Multer.File["buffer"]): Promise<void>;
    protected generateNewUniqueImageName(originalname: string): string;
    protected saveRingImage(buffer: Express.Multer.File["buffer"], newUniqueImageName: string): Promise<void>;
    protected updateRingImage(file: Express.Multer.File, oldFileName: string): Promise<string>;
    protected deleteRingImage(imageName: string): Promise<void>;
}
