import * as dotenv from 'dotenv';
if ( process.env.NODE_ENV != 'production' ) {
    dotenv.config();
}
const MINIO_ADDRESS: string = process.env.API_CETURB_MINIO_ADDRESS;
const MINIO_SECRETKEY: string = process.env.API_CETURB_MINIO_SECRETKEY;
const MINIO_KEY: string = process.env.API_CETURB_MINIO_KEY;


export class MinioConfig {
    constructor(
        readonly address: string = MINIO_ADDRESS,
        readonly secretKey: string = MINIO_SECRETKEY,
        readonly key: string = MINIO_KEY,
        readonly configHost: string = './mc config host add minio',
        readonly createBucket: string = './mc mb minio/gtfs',
        readonly policyDownload: string = './mc policy download minio/gtfs',
        readonly list: string = './mc ls minio/gtfs'
    ) { }
}
