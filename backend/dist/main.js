"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const logger = new common_1.Logger("bootstrap");
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get("port");
    const host = configService.get("host");
    const allowedOrigin = configService.get("allowedOrigin");
    const nodeEnv = configService.get("nodeEnv");
    const baseUrl = nodeEnv === "development" ? `${host}:${port}` : host;
    app.enableCors({
        origin: nodeEnv !== "development" ? allowedOrigin : "*",
    });
    if (nodeEnv !== "development" || host === "http://localhost") {
        app.use((0, helmet_1.default)({
            crossOriginResourcePolicy: { policy: "cross-origin" },
        }));
    }
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Junior-Challenge")
        .setDescription("Junior-Challenge API")
        .setVersion("1.0")
        .addBearerAuth(undefined, "defaultBearerAuth")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document, {
        customSiteTitle: "Junior-Challenge API",
    });
    await app.listen(port, () => {
        logger.verbose(`Server is running on ${baseUrl}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map