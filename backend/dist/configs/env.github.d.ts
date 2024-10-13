interface EnvConfig {
    github: {
        clientId: string | undefined;
        clientSecret: string | undefined;
        callbackUrl: string | undefined;
    };
}
declare const _default: () => EnvConfig;
export default _default;
