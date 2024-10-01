import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @Length(4, 255)
  @ApiProperty()
  public newPassword?: string;
}
