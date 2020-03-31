import express from 'express';
import config from './config';
import Logger from './loaders/logger';
import loaders from './loaders';

const startServer = async () => {
    const app = express();

    await loaders({expressApp: app});

    app.listen(config.port, err => {
        if (err) {
            Logger.error(err);
            process.exit(1);
            return;
        }
    });

    Logger.info(`Server listening on port: ${config.port}`);
};

export default startServer();