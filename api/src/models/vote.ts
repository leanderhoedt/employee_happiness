import { IVote } from '../interfaces/IVote';
import mongoose from 'mongoose';

const Vote = new mongoose.Schema(
    {
        mood: {
            type: String,
            required: [true, "Please provide mood"]
        },

        date: {
            type: Date,
            required: [true, "Please provide date"]
        }
    },
    { timestamps: true },
);

export default mongoose.model<IVote & mongoose.Document>('Vote', Vote);