import express from 'express';
import config from './config';
import Logger from './loaders/logger';


const startServer = async () => {
    const app = express();

    await require('./loaders').default({ expressApp: app });

    app.listen(config.port, err => {
        if(err) {
            Logger.error(err);
            process.exit(1);
            return;
        }
    });

    Logger.info(`Server listening on port: ${config.port}`);
}

export default startServer();