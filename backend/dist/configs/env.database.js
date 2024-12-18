"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    database: {
        mysql: {
            dialect: process.env.DB_DIALECT,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            name: process.env.DB_NAME,
        },
        postgres: {
            dialect: process.env.POSTGRES_DIALECT,
            url: process.env.POSTGRES_URL,
            prismaUrl: process.env.POSTGRES_PRISMA_URL,
            urlNoSsl: process.env.POSTGRES_URL_NO_SSL,
            urlNonPooling: process.env.POSTGRES_URL_NON_POOLING,
            username: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            port: process.env.POSTGRES_PORT,
        },
    },
});
//# sourceMappingURL=env.database.js.map