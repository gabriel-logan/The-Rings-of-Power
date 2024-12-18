import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";

import sequelizeAsyncConfig from "../sequelize.config";

describe("sequelize.config", () => {
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const config = {
                "database.mysql.dialect": "mysql",
                "database.mysql.host": "localhost",
                "database.mysql.port": 5432,
                "database.mysql.username": "testuser",
                "database.mysql.password": "testpass",
                "database.mysql.name": "testdb",
                nodeEnv: "development",
              };
              return config[key as keyof typeof config];
            }),
          },
        },
      ],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
  });

  it("should return the sequelize configuration", async () => {
    if (!sequelizeAsyncConfig.useFactory) {
      throw new Error("sequelizeAsyncConfig.useFactory is undefined");
    }
    const config = await sequelizeAsyncConfig.useFactory(configService);
    expect(config).toBeDefined();
    expect(config.dialect).toBe("mysql");
    expect(config.host).toBe("localhost");
    expect(config.port).toBe(5432);
    expect(config.username).toBe("testuser");
    expect(config.password).toBe("testpass");
    expect(config.database).toBe("testdb");
    expect(config.autoLoadModels).toBe(true);
    expect((config.dialectOptions as { timezone: string }).timezone).toBe(
      "-03:00",
    );
    expect(config.timezone).toBe("-03:00");
    expect(config.define?.timestamps).toBe(true);
    expect(config.define?.underscored).toBe(true);
    expect(config.logging).toBeInstanceOf(Function);
    expect(config.sync?.force).toBe(false);
  });

  it("should not log SQL queries in production mode", async () => {
    if (!sequelizeAsyncConfig.useFactory) {
      throw new Error("sequelizeAsyncConfig.useFactory is undefined");
    }
    jest.spyOn(configService, "get").mockImplementation((key: string) => {
      if (key === "nodeEnv") return "production";
      return "test";
    });

    const config = await sequelizeAsyncConfig.useFactory(configService);
    const logSpy = jest
      .spyOn(Logger.prototype, "debug")
      .mockImplementation(() => {});

    const result =
      typeof config.logging === "function" ? config.logging("SELECT 1") : false;

    expect(result).toBe(false);
    expect(logSpy).not.toHaveBeenCalled();

    logSpy.mockRestore();
  });

  it("should log SQL queries in development mode", async () => {
    if (!sequelizeAsyncConfig.useFactory) {
      throw new Error("sequelizeAsyncConfig.useFactory is undefined");
    }

    jest.spyOn(configService, "get").mockImplementation((key: string) => {
      if (key === "nodeEnv") return "development";
      return "test";
    });

    const config = await sequelizeAsyncConfig.useFactory(configService);
    const logSpy = jest
      .spyOn(Logger.prototype, "debug")
      .mockImplementation(() => {});

    const result =
      typeof config.logging === "function" ? config.logging("SELECT 1") : false;

    expect(result).toBeUndefined();
    expect(logSpy).toHaveBeenCalledWith("SELECT 1");

    logSpy.mockRestore();
  });
});
