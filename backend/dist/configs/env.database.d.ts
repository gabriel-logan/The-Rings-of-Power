interface MysqlDatabase {
    dialect: string;
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
}
interface PostgresDatabase {
    url: string;
    prismaUrl: string;
    urlNoSsl: string;
    urlNonPooling: string;
    user: string;
    host: string;
    password: string;
    database: string;
    port: string;
}
interface EnvConfig {
    database: {
        mysql: MysqlDatabase;
        postgres: PostgresDatabase;
    };
}
declare const _default: () => EnvConfig;
export default _default;
