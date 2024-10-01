import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/sequelize";
import { put, del } from "@vercel/blob";

import RingGlobalValidations from "./RingGlobalValidations";
import { CreateRingDto } from "./dto/create-ring.dto";
import { UpdateRingDto } from "./dto/update-ring.dto";
import { Ring } from "./entities/ring.entity";
import { ReqAuthUser } from "./types/Req";

@Injectable()
export class RingService extends RingGlobalValidations {
  private readonly logger = new Logger(RingService.name);

  private readonly host: string;
  private readonly port: string;
  private readonly nodeEnv: string;
  private readonly baseUrl: string;
  private readonly blobReadWriteToken: string;

  constructor(
    @InjectModel(Ring)
    private readonly ringModel: typeof Ring,
    private readonly configService: ConfigService,
  ) {
    super();
    this.host = this.configService.get<string>("host")!;
    this.port = this.configService.get<string>("port")!;
    this.nodeEnv = this.configService.get<string>("nodeEnv")!;
    this.baseUrl =
      this.nodeEnv === "development" ? `${this.host}:${this.port}` : this.host;
    this.blobReadWriteToken =
      this.configService.get<string>("blobReadWriteToken")!;
  }

  async findAll(req: ReqAuthUser): Promise<Ring[]> {
    const rings = await this.ringModel.findAll({
      where: {
        userId: req.user.sub,
      },
    });

    if (!rings.length) {
      throw new NotFoundException("No rings found");
    }

    rings.forEach((ring) => {
      // ring.url = `${this.baseUrl}/uploads/${ring.image}`;
      ring.url = ring.image;
    });

    return rings;
  }

  async findOne(id: number, req: ReqAuthUser): Promise<Ring> {
    const ring = await this.ringModel.findOne({
      where: {
        id: id,
        userId: req.user.sub,
      },
    });

    if (!ring) {
      throw new NotFoundException(`Ring with id ${id} not found`);
    }

    // ring.url = `${this.baseUrl}/uploads/${ring.image}`;

    ring.url = ring.image;

    return ring;
  }

  async create(
    createRingDto: CreateRingDto,
    file: Express.Multer.File,
    req: ReqAuthUser,
  ): Promise<Ring> {
    const { name, power, owner, forgedBy } = createRingDto;

    // Invalidate if forgedBy is not a valid ring
    if (!this.isValidRing(forgedBy)) {
      throw new BadRequestException(`Invalid forgedBy value: ${forgedBy}`);
    }

    await this.validateRingCreation(
      this.ringModel,
      createRingDto.forgedBy,
      req.user.sub,
    );

    const blob = await put(file.originalname, file.buffer, {
      access: "public",
      token: this.blobReadWriteToken,
    });

    // Save or update ring image
    // const imageSaved = await this.saveOrUpdateRingImage(file);

    let newRing: Ring;

    try {
      newRing = await this.ringModel.create({
        name,
        power,
        owner,
        forgedBy,
        image: blob.url,
        userId: req.user.sub,
      });
    } catch {
      throw new BadRequestException("Error creating ring");
    }

    // newRing.url = `${this.baseUrl}/uploads/${newRing.image}`;

    newRing.url = blob.url;

    return newRing;
  }

  async update(
    id: number,
    updateRingDto: UpdateRingDto,
    file: Express.Multer.File | undefined,
    req: ReqAuthUser,
  ): Promise<Ring> {
    const { name, power, owner, forgedBy } = updateRingDto;

    // Invalidate if forgedBy is not a valid ring
    if (forgedBy && !this.isValidRing(forgedBy)) {
      throw new BadRequestException(`Invalid forgedBy value: ${forgedBy}`);
    }

    const ring = await this.ringModel.findOne({
      where: {
        id: id,
        userId: req.user.sub,
      },
    });

    if (!ring) {
      throw new NotFoundException(`Ring with id ${id} not found`);
    }

    if (updateRingDto.forgedBy) {
      await this.validateRingCreation(
        this.ringModel,
        updateRingDto.forgedBy,
        req.user.sub,
        ring,
      );
    }

    // Save or update ring image
    if (file) {
      /**
      const imageSaved = await this.saveOrUpdateRingImage(file, {
          isUpdate: true,
          oldFileName: ring.image,
      });
      */

      const blob = await put(file.originalname, file.buffer, {
        access: "public",
        token: this.blobReadWriteToken,
      });

      ring.image = blob.url;

      ring.url = blob.url;
    }

    ring.name = name || ring.name;
    ring.power = power || ring.power;
    ring.owner = owner || ring.owner;
    ring.forgedBy = forgedBy || ring.forgedBy;

    // ring.url = `${this.baseUrl}/uploads/${ring.image}`;

    await ring.save();

    return ring;
  }

  async delete(id: number, req: ReqAuthUser): Promise<null> {
    const ring = await this.ringModel.findOne({
      where: {
        id: id,
        userId: req.user.sub,
      },
    });

    if (!ring) {
      throw new NotFoundException(`Ring with id ${id} not found`);
    }

    await ring.destroy();

    await del(ring.image, {
      token: this.blobReadWriteToken,
    });

    // await this.deleteRingImage(ring.image);

    return null;
  }
}
