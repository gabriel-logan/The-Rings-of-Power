import { Cache } from "@nestjs/cache-manager";
import { CreateRingDto } from "./dto/create-ring.dto";
import { UpdateRingDto } from "./dto/update-ring.dto";
import { Ring } from "./entities/ring.entity";
import { RingService } from "./ring.service";
import { ReqAuthUser } from "./types/Req";
export declare class RingController {
    private readonly ringService;
    private readonly cacheManager;
    constructor(ringService: RingService, cacheManager: Cache);
    findAll(req: ReqAuthUser): Promise<Ring[]>;
    findOne(id: number, req: ReqAuthUser): Promise<Ring>;
    create(createRingDto: CreateRingDto, file: Express.Multer.File, req: ReqAuthUser): Promise<Ring>;
    update(updateRingDto: UpdateRingDto, id: number, file: Express.Multer.File | undefined, req: ReqAuthUser): Promise<Ring>;
    delete(id: number, req: ReqAuthUser): Promise<null>;
}
