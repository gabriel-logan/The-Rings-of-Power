interface MysqlDatabase {
    dialect: string;
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
}
interface PostgresDatabase {
    dialect: string;
    url: string;
    prismaUrl: string;
    urlNoSsl: string;
    urlNonPooling: string;
    username: string;
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
