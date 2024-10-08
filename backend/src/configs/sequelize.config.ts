import { Logger } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import type { SequelizeModuleAsyncOptions } from "@nestjs/sequelize";
import pg from "pg";

const sequelizeAsyncConfig: SequelizeModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    const logger = new Logger("SequelizeConfig");
    const nodeEnv = configService.get("nodeEnv");

    const host =
      nodeEnv === "development"
        ? configService.get("database.host")
        : configService.get("postgresHost");

    const port =
      nodeEnv === "development"
        ? configService.get("database.port")
        : configService.get("postgresPort");

    const username =
      nodeEnv === "development"
        ? configService.get("database.username")
        : configService.get("postgresUser");

    const password =
      nodeEnv === "development"
        ? configService.get("database.password")
        : configService.get("postgresPassword");

    const database =
      nodeEnv === "development"
        ? configService.get("database.name")
        : configService.get("postgresDatabase");

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
        force: true,
        alter: true,
      },
    };
  },
  inject: [ConfigService],
};

export default sequelizeAsyncConfig;
