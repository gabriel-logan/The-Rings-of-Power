import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/sequelize";
import { del, put } from "@vercel/blob";
import { cacheKeys } from "src/global/constants";
import type { ReqUser } from "src/global/types";

import { CreateRingDto } from "../dto/create-ring.dto";
import { UpdateRingDto } from "../dto/update-ring.dto";
import { Ring } from "../entities/ring.entity";
import RingGlobalValidations from "../utils/RingGlobalValidations";

@Injectable()
export class RingService extends RingGlobalValidations {
  private readonly logger = new Logger(RingService.name);

  private readonly blobReadWriteToken =
    this.configService.get<string>("blobReadWriteToken");

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Ring) private readonly ringModel: typeof Ring,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    super();
  }

  async findAll(req: ReqUser): Promise<Ring[]> {
    const cachedRings = await this.cacheManager.get<Ring[]>(
      cacheKeys.rings(req.user.sub),
    );

    const notFoundMsg = "No rings found";

    if (cachedRings) {
      if (cachedRings.length) {
        return cachedRings;
      }
      throw new NotFoundException(notFoundMsg);
    }

    const rings = await this.ringModel.findAll({
      where: {
        userId: req.user.sub,
      },
    });

    await this.cacheManager.set(cacheKeys.rings(req.user.sub), rings);

    if (!rings.length) {
      throw new NotFoundException(notFoundMsg);
    }

    return rings;
  }

  async findOne(id: number, req: ReqUser): Promise<Ring> {
    const cachedRing = await this.cacheManager.get<Ring | "NotFound">(
      cacheKeys.ring(id, req.user.sub),
    );

    const notFoundMsg = `Ring with id ${id} not found`;

    if (cachedRing) {
      if (cachedRing === "NotFound") {
        throw new NotFoundException(notFoundMsg);
      }
      return cachedRing;
    }

    const ring = await this.ringModel.findOne({
      where: {
        id: id,
        userId: req.user.sub,
      },
    });

    await this.cacheManager.set(
      cacheKeys.ring(id, req.user.sub),
      ring || "NotFound",
    );

    if (!ring) {
      throw new NotFoundException(notFoundMsg);
    }

    return ring;
  }

  async create(
    createRingDto: CreateRingDto,
    file: Express.Multer.File,
    req: ReqUser,
  ): Promise<Ring> {
    const { name, power, owner, forgedBy } = createRingDto;

    // Validate if all fields are filled
    this.fieldsIsEmptyTrimmed({ name, power, owner, forgedBy });

    // Validate image type
    await this.validateImageType(file.buffer);

    // Invalidate if forgedBy is not a valid ring
    if (!this.isValidRing(forgedBy)) {
      throw new BadRequestException(`Invalid forgedBy value: ${forgedBy}`);
    }

    // Validate ring creation
    await this.validateRingCreation(
      this.ringModel,
      createRingDto.forgedBy,
      req.user.sub,
    );

    const blob = await put(file.originalname, file.buffer, {
      access: "public",
      token: this.blobReadWriteToken,
    });

    // Generate a new unique image name
    // const newImageName = this.generateNewUniqueImageName(file.originalname);

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

      // Save or update ring image
      // await this.saveRingImage(file.buffer, newImageName);
    } catch {
      throw new BadRequestException("Error creating ring");
    }

    // Invalidate cache
    await this.cacheManager.del(cacheKeys.rings(req.user.sub));
    // Invalidate the cache for all users
    await this.cacheManager.del(cacheKeys.users());
    await this.cacheManager.del(cacheKeys.user(req.user.sub));

    return newRing;
  }

  async update(
    id: number,
    updateRingDto: UpdateRingDto,
    file: Express.Multer.File | undefined,
    req: ReqUser,
  ): Promise<Ring> {
    const { name, power, owner, forgedBy } = updateRingDto;

    // Validate if all fields are filled
    this.updateFieldsIsEmptyTrimmed({ name, power, owner, forgedBy });

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
      // Validate ring creation
      await this.validateRingCreation(
        this.ringModel,
        updateRingDto.forgedBy,
        req.user.sub,
        ring,
      );
    }

    // Save or update ring image
    if (file) {
      // const imageSaved = await this.updateRingImage(file, ring.image);

      await this.validateImageType(file.buffer);

      // Delete the old image
      await del(ring.image, {
        token: this.blobReadWriteToken,
      });

      const blob = await put(file.originalname, file.buffer, {
        access: "public",
        token: this.blobReadWriteToken,
      });

      ring.image = blob.url;
    }

    ring.name = name || ring.name; // nosonar
    ring.power = power || ring.power; // nosonar
    ring.owner = owner || ring.owner; // nosonar
    ring.forgedBy = forgedBy || ring.forgedBy; // nosonar

    await ring.save();

    // Invalidate the cache for the updated ring
    await this.cacheManager.del(cacheKeys.rings(req.user.sub));
    await this.cacheManager.del(cacheKeys.ring(id, req.user.sub));
    // Invalidate the cache for all users
    await this.cacheManager.del(cacheKeys.users());
    await this.cacheManager.del(cacheKeys.user(req.user.sub));

    return ring;
  }

  async delete(id: number, req: ReqUser): Promise<null> {
    const ring = await this.ringModel.findOne({
      where: {
        id: id,
        userId: req.user.sub,
      },
    });

    if (!ring) {
      throw new NotFoundException(`Ring with id ${id} not found`);
    }

    try {
      await del(ring.image, {
        token: this.blobReadWriteToken,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      this.logger.error(
        `Failed to delete image for ring ${id}: ${error.message}`,
      );
      throw new BadRequestException(`Failed to delete image for ring`);
    }

    // await this.deleteRingImage(ring.image);

    await ring.destroy();

    // Invalidate the cache for the deleted ring
    await this.cacheManager.del(cacheKeys.rings(req.user.sub));
    await this.cacheManager.del(cacheKeys.ring(id, req.user.sub));
    // Invalidate the cache for all users
    await this.cacheManager.del(cacheKeys.users());
    await this.cacheManager.del(cacheKeys.user(req.user.sub));

    return null;
  }
}
