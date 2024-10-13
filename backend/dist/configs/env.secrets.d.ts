interface EnvConfig {
    token: {
        secret: string;
        expiration: string;
    };
    queryParams: {
        secret: string;
    };
}
declare const _default: () => EnvConfig;
export default _default;
