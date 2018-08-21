import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import * as apicache from 'apicache';
let cache = apicache.middleware;

@Injectable()
export class CacheMiddleware implements NestMiddleware {
    resolve ( ...args: any[] ): MiddlewareFunction {
        return ( req, res, next ) => {
            console.log( 'Request...' );
            next();
        };
    }
}
