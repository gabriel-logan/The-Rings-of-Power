interface EnvConfig {
    postgresUrl: string;
    postgresPrismaUrl: string;
    postgresUrlNoSsl: string;
    postgresUrlNonPooling: string;
    postgresUser: string;
    postgresHost: string;
    postgresPassword: string;
    postgresDatabase: string;
    postgresPort: string;
}
declare const _default: () => EnvConfig;
export default _default;
