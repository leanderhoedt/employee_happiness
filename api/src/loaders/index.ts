import mongooseLoader from './mongoose';
import Logger from './logger';
import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';

export default async ({expressApp}) => {
    const mongoConnection = await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');

    /**
     * WTF is going on here?
     *
     * We are injecting the mongoose models into the DI container.
     * I know this is controversial but will provide a lot of flexibility at the time
     * of writing unit tests, just go and check how beautiful they are!
     */

    const userModel = {
        name: 'userModel',
        // Notice the require syntax and the '.default'
        model: require('../models/user').default,
    };

    const voteModel = {
        name: 'voteModel',
        model: require('../models/vote').default,
    }

    // It returns the agenda instance because it's needed in the subsequent loaders
    const {  } = await dependencyInjectorLoader({
        mongoConnection,
        models: [
            userModel,
            voteModel,
        ],
    });
    await expressLoader({app: expressApp});
    Logger.info('✌️ Express loaded');
}