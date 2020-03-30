import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';

export default async (): Promise<Db> => {
    return await mongoose.connect(config.databaseURL, { useNewUrlParser: true, useCreateIndex: true });
};