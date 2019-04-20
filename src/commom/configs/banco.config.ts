import * as dotenv from 'dotenv';
if ( process.env.NODE_ENV != 'production' ) {
    dotenv.config();
}
const db_host = process.env.API_CETURB_TRANSCOLDB_HOST;
const db_port: number = Number( process.env.API_CETURB_TRANSCOLDB_PORT );
const db_username = process.env.API_CETURB_TRANSCOLDB_USER;
const db_password = process.env.API_CETURB_TRANSCOLDB_PASSWORD;
const db_schema = process.env.API_CETURB_TRANSCOLDB_SCHEMA;
const orm_sync: boolean = Boolean( process.env.API_CETURB_TRANSCOLDB_ORM_SYNC == 'true' );

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
