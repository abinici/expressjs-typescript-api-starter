import * as express from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'after' })
export class LoggingMiddleware implements ExpressMiddlewareInterface {

    use(request: express.Request, response: express.Response, next: express.Errback): void {
        // tslint:disable-next-line:no-console
        console.log(`${request.method} ${request.url} (${response.statusCode})`);
        next(null);
    }

}
