"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
const env_database_1 = require("./env.database");
const sequelizeAsyncConfig = {
    imports: [config_1.ConfigModule.forFeature(env_database_1.default)],
    useFactory: (configService) => {
        const logger = new common_1.Logger("SequelizeConfig");
        const nodeEnv = configService.get("nodeEnv");
        const host = nodeEnv === "development"
            ? configService.get("database.mysql.host")
            : configService.get("database.postgres.host");
        const port = nodeEnv === "development"
            ? configService.get("database.mysql.port")
            : configService.get("database.postgres.port");
        const username = nodeEnv === "development"
            ? configService.get("database.mysql.username")
            : configService.get("database.postgres.username");
        const password = nodeEnv === "development"
            ? configService.get("database.mysql.password")
            : configService.get("database.postgres.password");
        const database = nodeEnv === "development"
            ? configService.get("database.mysql.name")
            : configService.get("database.postgres.database");
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
                if (nodeEnv === "development") {
                    return logger.debug(sql);
                }
                return false;
            },
            sync: {
                force: false,
            },
        };
    },
    inject: [config_1.ConfigService],
};
exports.default = sequelizeAsyncConfig;
//# sourceMappingURL=sequelize.config.js.map