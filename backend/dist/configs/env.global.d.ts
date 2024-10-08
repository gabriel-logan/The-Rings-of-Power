interface EnvConfig {
    nodeEnv: string;
    allowedOrigin: string;
    database: {
        dialect: string;
        host: string;
        port: number;
        username: string;
        password: string;
        name: string;
    };
    host: string;
    port: number;
    imagesUrl: string;
    token: {
        secret?: string;
        expiration: string;
    };
}
declare const _default: () => EnvConfig;
export default _default;
