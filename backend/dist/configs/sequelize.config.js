"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
const sequelizeAsyncConfig = {
    imports: [config_1.ConfigModule],
    useFactory: (configService) => {
        const logger = new common_1.Logger("SequelizeConfig");
        return {
            dialect: "postgres",
            dialectModule: pg_1.default,
            host: configService.get("postgresHost"),
            port: configService.get("postgresPort"),
            username: configService.get("postgresUser"),
            password: configService.get("postgresPassword"),
            database: configService.get("postgresDatabase"),
            autoLoadModels: true,
            dialectOptions: {
                timezone: "-03:00",
                ssl: {
                    require: true,
                    rejectUnauthorized: true,
                },
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
                force: false,
            },
        };
    },
    inject: [config_1.ConfigService],
};
exports.default = sequelizeAsyncConfig;
//# sourceMappingURL=sequelize.config.js.map