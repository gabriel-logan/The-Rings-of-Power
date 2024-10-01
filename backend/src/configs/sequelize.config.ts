import { Logger } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import type { SequelizeModuleAsyncOptions } from "@nestjs/sequelize";

const sequelizeAsyncConfig: SequelizeModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    const logger = new Logger("SequelizeConfig");
    return {
      dialect: "postgres",
      host: configService.get("postgresHost"),
      port: configService.get("postgresPort"),
      username: configService.get("postgresUser"),
      password: configService.get("postgresPassword"),
      database: configService.get("postgresDatabase"),
      autoLoadModels: true,

      dialectOptions: {
        timezone: "-03:00",
      },

      timezone: "-03:00",

      define: {
        timestamps: true,
        underscored: true,
      },

      logging: (sql): false | void => {
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
  inject: [ConfigService],
};

export default sequelizeAsyncConfig;
