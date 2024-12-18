import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as compression from "compression";
import helmet from "helmet";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const logger = new Logger("bootstrap");

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get("port");
  const host = configService.get("host");
  const allowedOrigin = configService.get("allowedOrigin");
  const nodeEnv = configService.get("nodeEnv");
  const baseUrl = nodeEnv === "development" ? `${host}:${port}` : host;

  app.enableCors({
    origin: nodeEnv !== "development" ? allowedOrigin : "*",
  });

  if (nodeEnv !== "development" || host === "http://localhost") {
    app.use(
      helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
      }),
    );
  }

  app.use(compression());

  const config = new DocumentBuilder()
    .setTitle("The-Rings-of-Power")
    .setDescription("The-Rings-of-Power API")
    .setVersion("1.0")
    .addBearerAuth(undefined, "defaultBearerAuth")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document, {
    customSiteTitle: "The-Rings-of-Power API",
  });

  await app.listen(port, () => {
    logger.verbose(`Server is running on ${baseUrl}`);
  });
}

bootstrap();
