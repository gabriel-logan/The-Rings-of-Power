import { Cache } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import RingGlobalValidations from "./RingGlobalValidations";
import { CreateRingDto } from "./dto/create-ring.dto";
import { UpdateRingDto } from "./dto/update-ring.dto";
import { Ring } from "./entities/ring.entity";
import { ReqAuthUser } from "./types/Req";
export declare class RingService extends RingGlobalValidations {
    private readonly ringModel;
    private readonly configService;
    private readonly cacheManager;
    private readonly logger;
    private readonly host;
    private readonly port;
    private readonly nodeEnv;
    private readonly baseUrl;
    private readonly blobReadWriteToken;
    constructor(ringModel: typeof Ring, configService: ConfigService, cacheManager: Cache);
    findAll(req: ReqAuthUser): Promise<Ring[]>;
    findOne(id: number, req: ReqAuthUser): Promise<Ring>;
    create(createRingDto: CreateRingDto, file: Express.Multer.File, req: ReqAuthUser): Promise<Ring>;
    update(id: number, updateRingDto: UpdateRingDto, file: Express.Multer.File | undefined, req: ReqAuthUser): Promise<Ring>;
    delete(id: number, req: ReqAuthUser): Promise<null>;
    private validateImage;
}
