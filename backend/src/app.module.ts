import { ExecutionContext, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { SequelizeModule } from "@nestjs/sequelize";
import { ServeStaticModule } from "@nestjs/serve-static";
import { seconds, ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import type { Request } from "express";
import { join } from "path";

import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import envGlobal from "./configs/env.global";
import sequelizeAsyncConfig from "./configs/sequelize.config";
import { RingModule } from "./ring/ring.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envGlobal],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: seconds(10),
        limit: 3,
        blockDuration: (context: ExecutionContext): number => {
          const request: Request = context.switchToHttp().getRequest();
          if (request.method === "POST" && request.url === "/user") {
            return seconds(8);
          }
          if (request.method === "DELETE") {
            return seconds(60);
          }
          if (request.method === "PUT") {
            return seconds(15);
          }
          return seconds(20);
        },
        skipIf: (context: ExecutionContext): boolean => {
          const request: Request = context.switchToHttp().getRequest();
          const isGetRequest = request.method === "GET";
          return isGetRequest;
        },
      },
    ]),
    SequelizeModule.forRootAsync(sequelizeAsyncConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      serveRoot: "/",
      renderPath: "/",
    }),
    RingModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
