import mongoose, {Mongoose} from 'mongoose';
import config from '../config';

export default async (): Promise<Mongoose> => {
    const connection = await mongoose.connect(config.databaseURL, {useNewUrlParser: true, useCreateIndex: true});
    return connection;
};