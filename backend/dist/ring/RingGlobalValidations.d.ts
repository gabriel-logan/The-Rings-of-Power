import type { Ring } from "./entities/ring.entity";
import type { ForgedBy } from "./types/ForgedBy";
export default class RingGlobalValidations {
    private validateForgedByLimit;
    protected validateRingCreation(ringModel: typeof Ring, forgedBy: string, userId: number, ring?: Ring): Promise<void>;
    protected isValidRing(forgedBy: ForgedBy): boolean;
    protected saveOrUpdateRingImage(file: Express.Multer.File, { isUpdate, oldFileName }?: {
        isUpdate: boolean;
        oldFileName: string;
    }): Promise<string>;
    protected deleteRingImage(imageName: string): Promise<void>;
}
