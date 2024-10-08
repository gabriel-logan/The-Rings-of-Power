"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
const sequelizeAsyncConfig = {
    imports: [config_1.ConfigModule],
    useFactory: (configService) => {
        const logger = new common_1.Logger("SequelizeConfig");
        const nodeEnv = configService.get("nodeEnv");
        const host = nodeEnv === "development"
            ? configService.get("database.host")
            : configService.get("postgresHost");
        const port = nodeEnv === "development"
            ? configService.get("database.port")
            : configService.get("postgresPort");
        const username = nodeEnv === "development"
            ? configService.get("database.username")
            : configService.get("postgresUser");
        const password = nodeEnv === "development"
            ? configService.get("database.password")
            : configService.get("postgresPassword");
        const database = nodeEnv === "development"
            ? configService.get("database.name")
            : configService.get("postgresDatabase");
        return {
            dialect: nodeEnv === "development" ? "mysql" : "postgres",
            dialectModule: nodeEnv === "development" ? undefined : pg_1.default,
            host: host,
            port: port,
            username: username,
            password: password,
            database: database,
            autoLoadModels: true,
            dialectOptions: {
                timezone: "-03:00",
                ...(nodeEnv === "production" && {
                    ssl: {
                        require: true,
                        rejectUnauthorized: true,
                    },
                }),
            },
            timezone: "-03:00",
            define: {
                timestamps: true,
                underscored: true,
            },
            logging: (sql) => {
                if (configService.get("nodeEnv") === "development") {
                    return logger.debug(sql);
                }
                return false;
            },
            sync: {
                force: true,
            },
        };
    },
    inject: [config_1.ConfigService],
};
exports.default = sequelizeAsyncConfig;
//# sourceMappingURL=sequelize.config.js.map