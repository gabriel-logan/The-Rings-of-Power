interface EnvConfig {
    nodeEnv: string;
    allowedOrigin: string;
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
