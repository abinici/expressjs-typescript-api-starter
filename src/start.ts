import * as http from 'http';
import { ApiServer } from './api.server';

export const start = (): Promise<http.Server> => {
    return new Promise<http.Server>((resolve, reject) => {
        const apiServer = new ApiServer();
        const graceful = () => {
            apiServer.stop().then(() => {
                // tslint:disable-next-line:no-console
                console.log('Stopping process');
                process.exit(0);
            });
        };

        // Stop graceful
        process.on('SIGTERM', graceful);
        process.on('SIGINT', graceful);

        return apiServer.start()
            .then(resolve)
            .catch(reject);
    });
};
