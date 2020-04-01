import 'reflect-metadata';
import express from 'express';
import config from './config';
import Logger from './loaders/logger';
import loaders from './loaders';
import {Container} from "typedi";
import AuthService from "./services/auth";
import VoteService from "./services/vote";

const startServer = async () => {
    const app = express();

    const {mongoConnection} = await loaders({expressApp: app});

    app.listen(config.port, err => {
        /**
         * Generate som dummy data
         */
        const UserModel = Container.get("userModel");
        const VoteModel = Container.get("voteModel");
        const Logger = Container.get("logger");
        let voteService = new VoteService(UserModel, VoteModel, Logger);
        voteService.GenerateVotes();

        if (err) {
            Logger.error(err);
            process.exit(1);
            return;
        }
    });

    Logger.info(`Server listening on port: ${config.port}`);
    process.on('SIGINT', async () => {
        const UserModel = Container.get("userModel");
        await UserModel.deleteMany({});
        const VoteModel = Container.get("voteModel");
        await VoteModel.deleteMany({});

        await mongoConnection.connection.close(() => {
            Logger.info('Database connection disconnected through app termination');
            process.exit(0);
        });
    });
};

export default startServer();