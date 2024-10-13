import { Logger } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import type { SequelizeModuleAsyncOptions } from "@nestjs/sequelize";
import pg from "pg";

import envDatabase from "./env.database";

const sequelizeAsyncConfig: SequelizeModuleAsyncOptions = {
  imports: [ConfigModule.forFeature(envDatabase)],
  useFactory: (configService: ConfigService) => {
    const logger = new Logger("SequelizeConfig");
    const nodeEnv = configService.get("nodeEnv");

    const host =
      nodeEnv === "development"
        ? configService.get("database.mysql.host")
        : configService.get("database.postgres.host");

    const port =
      nodeEnv === "development"
        ? configService.get("database.mysql.port")
        : configService.get("database.postgres.port");

    const username =
      nodeEnv === "development"
        ? configService.get("database.mysql.username")
        : configService.get("database.postgres.username");

    const password =
      nodeEnv === "development"
        ? configService.get("database.mysql.password")
        : configService.get("database.postgres.password");

    const database =
      nodeEnv === "development"
        ? configService.get("database.mysql.name")
        : configService.get("database.postgres.database");

    return {
      dialect: nodeEnv === "development" ? "mysql" : "postgres",
      dialectModule: nodeEnv === "development" ? undefined : pg,
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

      logging: (sql): false | void => {
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
  inject: [ConfigService],
};

export default sequelizeAsyncConfig;
