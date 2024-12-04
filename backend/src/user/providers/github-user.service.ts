import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/sequelize";
import { del } from "@vercel/blob";
import { cacheKeys } from "src/global/constants";
import type { ReqUser } from "src/global/types";
import { Ring } from "src/ring/entities/ring.entity";

import { DeleteUserGithubDto } from "../dto/delete-user.github.dto";
import { UpdateUserGithubDto } from "../dto/update-user.github.dto";
import { User } from "../entities/user.entity";
import UserGlobalValidations from "../utils/UserGlobalValidations";

@Injectable()
export class GithubUserService extends UserGlobalValidations {
  private readonly logger = new Logger(GithubUserService.name);

  private readonly blobReadWriteToken =
    this.configService.get<string>("blobReadWriteToken");
  private readonly nodeEnv = this.configService.get<string>("nodeEnv");

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User) private readonly userModel: typeof User,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    super();
  }

  async update(
    id: number,
    user: UpdateUserGithubDto,
    req: ReqUser,
  ): Promise<Pick<User, "id" | "username" | "email">> {
    const { username } = user;
    const { sub } = req.user;

    // Check if user is trying to update his own data
    this.validateUpdateOrDeleteUser({
      id,
      sub,
      msg: "You can not update this user",
    });

    const userToUpdate = await this.userModel.findByPk(id);

    if (!userToUpdate?.githubUserId) {
      throw new BadRequestException("User is not a Github user");
    }

    userToUpdate.username = username || userToUpdate.username; // nosonar

    await userToUpdate.save();

    // Invalidate cache
    await this.cacheManager.del(cacheKeys.users());
    await this.cacheManager.del(cacheKeys.user(id));

    return {
      id: userToUpdate.id,
      username: userToUpdate.username,
      email: userToUpdate.email,
    };
  }

  async delete(
    id: number,
    deleteUserDto: DeleteUserGithubDto,
    req: ReqUser,
  ): Promise<null> {
    const { confirm } = deleteUserDto;

    if (!confirm) {
      throw new BadRequestException("You must confirm the deletion");
    }

    const { sub } = req.user;

    // Check if user is trying to delete his own data
    this.validateUpdateOrDeleteUser({
      id,
      sub,
      msg: "You can not delete this user",
    });

    const user = await this.userModel.findByPk(id, {
      include: [
        {
          model: Ring,
          attributes: ["id", "image"],
        },
      ],
    });

    if (!user?.githubUserId) {
      throw new BadRequestException("User is not a Github user");
    }

    let deleteImagesPromises: Promise<void>[] = [];

    if (this.nodeEnv === "development") {
      // Delete all rings images when user is deleted
      deleteImagesPromises = user.rings.map(async (ring) => {
        await this.deleteRingImage(ring.image);
      });
    } else {
      // Delete all rings images when deleting user
      deleteImagesPromises = user.rings.map(async (ring) => {
        try {
          await del(ring.image, {
            token: this.blobReadWriteToken,
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          this.logger.error(
            `Failed to delete image for ring ${ring.id}: ${error.message}`,
          );
        }
      });
    }

    // Delete all rings
    await Promise.all(deleteImagesPromises);

    await user.destroy();

    // Invalidate cache
    await this.cacheManager.del(cacheKeys.users());
    await this.cacheManager.del(cacheKeys.user(id));

    return null;
  }
}
