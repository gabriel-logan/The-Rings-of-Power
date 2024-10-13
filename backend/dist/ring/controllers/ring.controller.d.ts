import type { ReqUser } from "src/global/types";
import { CreateRingDto } from "../dto/create-ring.dto";
import { UpdateRingDto } from "../dto/update-ring.dto";
import { Ring } from "../entities/ring.entity";
import { RingService } from "../providers/ring.service";
export declare class RingController {
    private readonly ringService;
    constructor(ringService: RingService);
    findAll(req: ReqUser): Promise<Ring[]>;
    findOne(id: number, req: ReqUser): Promise<Ring>;
    create(createRingDto: CreateRingDto, file: Express.Multer.File, req: ReqUser): Promise<Ring>;
    update(updateRingDto: UpdateRingDto, id: number, file: Express.Multer.File | undefined, req: ReqUser): Promise<Ring>;
    delete(id: number, req: ReqUser): Promise<null>;
}
