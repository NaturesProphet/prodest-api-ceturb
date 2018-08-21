import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import * as cache from 'apicache';

@Injectable()
export class CacheMiddleware implements NestMiddleware {
    resolve ( ...args: any[] ): MiddlewareFunction {
        return ( req, res, next ) => {
            console.log( 'Request...' );

            next();
        };
    }
}
