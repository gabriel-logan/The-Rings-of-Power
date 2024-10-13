import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/sequelize";
import { del } from "@vercel/blob";
import { existsSync, unlinkSync } from "fs";
import { join } from "path";
import { Ring } from "src/ring/entities/ring.entity";

import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { ReqAuthUser } from "./types/Req";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly atributesToShow = ["id", "username"];
  private readonly includeAtributes = [
    {
      model: Ring,
      attributes: ["id", "name", "power", "owner", "forgedBy", "image", "url"],
    },
  ];

  private readonly blobReadWriteToken =
    this.configService.get<string>("blobReadWriteToken");

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly configService: ConfigService,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.findAll({
      attributes: this.atributesToShow,
      include: this.includeAtributes,
    });

    if (users.length === 0) {
      throw new NotFoundException("No users found");
    }

    return users;
  }

  async findByPk(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, {
      attributes: this.atributesToShow,
      include: this.includeAtributes,
    });

    this.logger.log(user);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findOne(username: CreateUserDto["username"]): Promise<User> {
    const user = await this.userModel.findOne({
      where: { username },
      attributes: this.atributesToShow,
      include: this.includeAtributes,
    });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    return user;
  }

  async create(user: CreateUserDto): Promise<Pick<User, "id" | "username">> {
    const { username, password } = user;

    let newUser: User;

    try {
      newUser = await this.userModel.create({ username, password });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException("Username already exists");
    }

    return {
      id: newUser.id,
      username: newUser.username,
    };
  }

  async update(
    id: number,
    user: UpdateUserDto,
    req: ReqAuthUser,
  ): Promise<Pick<User, "id" | "username">> {
    const { username, password, newPassword } = user;
    const { sub } = req.user;

    // Check if user is trying to update his own data
    this.validateUpdateOrDeleteUser({
      id,
      sub,
      msg: "You can not update this user",
    });

    const userToUpdate = await this.userModel.findByPk(id);

    if (!userToUpdate) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (password) {
      await this.validatePassword(userToUpdate, password);
    } else {
      throw new BadRequestException("Password is required");
    }

    if (newPassword) {
      this.validateNewPassword(newPassword, password);

      userToUpdate.password = newPassword;
    } else {
      userToUpdate.password = password;
    }

    userToUpdate.username = username || userToUpdate.username; // nosonar

    try {
      await userToUpdate.save();
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException("Username already exists");
    }

    return {
      id: userToUpdate.id,
      username: userToUpdate.username,
    };
  }

  async delete(
    id: number,
    deleteUserDto: DeleteUserDto,
    req: ReqAuthUser,
  ): Promise<null> {
    const { password } = deleteUserDto;

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

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.validatePassword(user, password);

    // Delete all rings images when user is deleted
    // const deleteImagesPromises = user.rings.map(async (ring) => {
    //  await this.deleteRingImage(ring.image);
    // });

    // Delete all rings images when deleting user
    const deleteImagePromises = user.rings.map(async (ring) => {
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

    // Delete all rings
    await Promise.all(deleteImagePromises);

    await user.destroy();

    return null;
  }

  private async deleteRingImage(imageName: string): Promise<void> {
    const destinationPath = join(process.cwd(), "uploads");

    const filePath = join(destinationPath, imageName);

    if (await existsSync(filePath)) {
      unlinkSync(filePath);
    }
  }

  private async validatePassword(user: User, password: string): Promise<void> {
    if (!(await user.passwordIsValid(password))) {
      throw new BadRequestException("Invalid password");
    }
  }

  private validateNewPassword(newPassword: string, oldPassword: string): void {
    if (newPassword.length < 4) {
      throw new BadRequestException(
        "Password must be at least 4 characters long",
      );
    }

    if (newPassword.length > 255) {
      throw new BadRequestException(
        "Password must be at most 255 characters long",
      );
    }

    if (newPassword === oldPassword) {
      throw new BadRequestException(
        "New password can not be the same as the old one",
      );
    }
  }

  private validateUpdateOrDeleteUser({
    id,
    sub,
    msg,
  }: {
    id: number;
    sub: number;
    msg: string;
  }): void {
    if (sub !== id) {
      throw new BadRequestException(msg);
    }
  }
}