import { Cache } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import type { ReqUser } from "src/global/types";
import { CreateRingDto } from "../dto/create-ring.dto";
import { UpdateRingDto } from "../dto/update-ring.dto";
import { Ring } from "../entities/ring.entity";
import RingGlobalValidations from "../utils/RingGlobalValidations";
export declare class RingService extends RingGlobalValidations {
    private readonly configService;
    private readonly ringModel;
    private readonly cacheManager;
    private readonly logger;
    private readonly blobReadWriteToken;
    constructor(configService: ConfigService, ringModel: typeof Ring, cacheManager: Cache);
    findAll(req: ReqUser): Promise<Ring[]>;
    findOne(id: number, req: ReqUser): Promise<Ring>;
    create(createRingDto: CreateRingDto, file: Express.Multer.File, req: ReqUser): Promise<Ring>;
    update(id: number, updateRingDto: UpdateRingDto, file: Express.Multer.File | undefined, req: ReqUser): Promise<Ring>;
    delete(id: number, req: ReqUser): Promise<null>;
}
