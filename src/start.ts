import { ApiServer } from './api.server';

export const start = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        const apiServer = new ApiServer();
        apiServer.start()
                .then(resolve)
                .catch(reject);

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
    });
};
