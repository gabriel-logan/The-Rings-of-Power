import type { CacheModuleOptions } from "@nestjs/cache-manager";
import type {
  FileTypeValidatorOptions,
  MaxFileSizeValidatorOptions,
} from "@nestjs/common";

export const cacheKeys = {
  users: (): string => "users",
  user: (userId: number): string => `user_${userId}`,
  rings: (userId: number): string => `rings_user_${userId}`,
  ring: (ringId: number, userId: number): string =>
    `ring_${ringId}_user_${userId}`,
};

export const cacheTtl = 60000 * 10; // 10 minutes

export const cacheModuleOptions: CacheModuleOptions = {
  ttl: cacheTtl,
};

export const fileValidation: {
  image: {
    size: MaxFileSizeValidatorOptions;
    allowedTypes: FileTypeValidatorOptions["fileType"];
  };
} = {
  image: {
    size: {
      maxSize: 1024 * 500, // 500KB
      message: "File is too large. Max size is 500KB",
    },
    allowedTypes: /jpeg|png/,
  },
};
