"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    postgresUrl: process.env.POSTGRES_URL,
    postgresPrismaUrl: process.env.POSTGRES_PRISMA_URL,
    postgresUrlNoSsl: process.env.POSTGRES_URL_NO_SSL,
    postgresUrlNonPooling: process.env.POSTGRES_URL_NON_POOLING,
    postgresUser: process.env.POSTGRES_USER,
    postgresHost: process.env.POSTGRES_HOST,
    postgresPassword: process.env.POSTGRES_PASSWORD,
    postgresDatabase: process.env.POSTGRES_DATABASE,
    postgresPort: process.env.POSTGRES_PORT,
});
//# sourceMappingURL=env.postgres.sql.js.map