import type { CacheModuleOptions } from "@nestjs/cache-manager";
import type { FileTypeValidatorOptions, MaxFileSizeValidatorOptions } from "@nestjs/common";
export declare const cacheKeys: {
    users: () => string;
    user: (userId: number) => string;
    rings: (userId: number) => string;
    ring: (ringId: number, userId: number) => string;
};
export declare const cacheTtl: number;
export declare const cacheModuleOptions: CacheModuleOptions;
export declare const fileValidation: {
    image: {
        size: MaxFileSizeValidatorOptions;
        allowedTypes: FileTypeValidatorOptions["fileType"];
    };
};
export declare const throttler: {
    global: {
        ttl: number;
        limit: number;
        blockDuration: {
            POST: {
                "/user": number;
            };
            DELETE: number;
            PUT: number;
            default: number;
        };
    };
};
