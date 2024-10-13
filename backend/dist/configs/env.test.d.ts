interface EnvConfig {
    nodeEnv: string;
    allowedOrigin: string;
    host: string;
    port: number;
    imagesUrl: string;
    github: {
        clientId: string;
        clientSecret: string;
        callbackUrl: string;
    };
    token: {
        secret?: string;
        expiration: string;
    };
}
declare const _default: () => EnvConfig;
export default _default;
