export declare const cacheKeys: {
    users: () => string;
    user: (userId: number) => string;
    rings: (userId: number) => string;
    ring: (ringId: number, userId: number) => string;
};
