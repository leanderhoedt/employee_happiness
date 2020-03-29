import {IUser} from '../interfaces/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please enter a first name'],
            index: true,
        },

        lastName: {
            type: String,
            required: [true, 'Please enter a last name'],
            index: true,
        },

        email: {
            type: String,
            lowercase: true,
            unique: true,
            index: true,
        },

        password: String,

        salt: String,

        role: {
            type: String,
            default: 'developer',
        },

        votes: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vote'
        }
    },
    {timestamps: true},
);

export default mongoose.model<IUser & mongoose.Document>('User', User);