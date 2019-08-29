import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import 'reflect-metadata';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import controllers from './controllers';
import middlewares from './middlewares';

export class ApiServer {

    public PORT: number = +process.env.PORT || 3000;

    private app: express.Application;
    private server: http.Server = null;

    constructor() {
        this.app = express();
        this.config();

        // Server.buildServices(this.app, ...controllers);
        useContainer(Container);
    }

    /**
     * Start the server
     * @returns {Promise<any>}
     */
    public start(): Promise<http.Server> {
        return new Promise<any>((resolve, reject) => {
            this.server = createExpressServer({
                controllers: controllers,
                development: (process.env.NODE_ENV !== 'production'),
                middlewares: middlewares
            }).listen(this.PORT, (err: any) => {
                if (err) {
                    return reject(err);
                }
                // tslint:disable-next-line:no-console max-line-length
                console.log(`Http server listening to http://${this.server.address().address}:${this.server.address().port}`);
                return resolve(this.server);
            });
        });

    }

    /**
     * Stop the server (if running).
     * @returns {Promise<boolean>}
     */
    public stop(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (this.server) {
                this.server.close(() => {
                    // tslint:disable-next-line:no-console
                    console.log('Http server stopped');
                    return resolve(true);
                });
            } else {
                return resolve(true);
            }
        });
    }

    /**
     * Configure the express app.
     */
    private config(): void {
        // Native Express configuration
        this.app.use(cors());
    }

}
