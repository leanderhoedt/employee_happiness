import {IUser} from '../interfaces/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please enter a first name'],
        },

        lastName: {
            type: String,
            required: [true, 'Please enter a last name'],
        },

        email: {
            type: String,
            lowercase: true,
            index: true,
        },

        password: String,

        salt: String,

        role: {
            type: String,
            default: 'developer',
        },

    },
    {timestamps: true},
);

export default mongoose.model<IUser & mongoose.Document>('User', User);