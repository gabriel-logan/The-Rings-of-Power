"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    database: {
        mysql: {
            dialect: process.env.DB_DIALECT ?? "mysql",
            host: process.env.DB_HOST ?? "localhost",
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
            username: process.env.DB_USERNAME ?? "root",
            password: process.env.DB_PASSWORD ?? "toor",
            name: process.env.DB_NAME ?? "ringdb",
        },
        postgres: {
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