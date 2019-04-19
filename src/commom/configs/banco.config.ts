import * as dotenv from 'dotenv';
if ( process.env.NODE_ENV != 'production' ) {
    dotenv.config();
}
const db_host = process.env.TRANSCOLDB_HOST;
const db_port: number = Number( process.env.TRANSCOLDB_PORT );
const db_username = process.env.TRANSCOLDB_USER;
const db_password = process.env.TRANSCOLDB_PASSWORD;
const db_schema = process.env.TRANSCOLDB_SCHEMA;
const orm_sync: boolean = Boolean( process.env.TRANSCOLDB_ORM_SYNC == 'true' );

export class BancoConfig {
    constructor(
        readonly type: 'mssql' = 'mssql',
        readonly host: string = db_host,
        readonly port: number = db_port,
        readonly login: string = db_username,
        readonly password = db_password,
        readonly schema = db_schema,
        readonly sync = orm_sync
    ) { }
}
