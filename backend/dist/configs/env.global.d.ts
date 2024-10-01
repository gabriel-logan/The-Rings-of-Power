interface EnvConfig {
    nodeEnv: string;
    blobReadWriteToken: string;
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
    token: {
        secret?: string;
        expiration: string;
    };
}
declare const _default: () => EnvConfig;
export default _default;
