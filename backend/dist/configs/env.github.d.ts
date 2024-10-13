interface EnvConfig {
    github: {
        clientId: string;
        clientSecret: string;
        callbackUrl: string;
    };
}
declare const _default: () => EnvConfig;
export default _default;
