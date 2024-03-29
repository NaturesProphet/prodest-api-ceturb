import * as dotenv from 'dotenv';
if ( process.env.NODE_ENV != 'production' ) {
    dotenv.config();
}
import * as apicache from 'apicache';
import * as redis from 'redis';
const RedisHost: string = process.env.API_CETURB_REDIS_HOST || '127.0.0.1';
const RedisPort: number = parseInt( process.env.API_CETURB_REDIS_PORT ) || 6379;

export class RedisConfig {
    constructor(
        readonly host: string = RedisHost,
        readonly port: number = RedisPort,
        readonly client = redis.createClient( port, host ),
        readonly cacheWithRedis = apicache.options( { redisClient: client } ).middleware
    ) { }
}
