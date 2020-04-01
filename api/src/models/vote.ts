import { IVote } from '../interfaces/IVote';
import mongoose from 'mongoose';

// we use parent referencing (instead of child referencing)
// votes can be large and is an anti-pattern in mongo
const Vote = new mongoose.Schema(
    {
        mood: {
            type: Number,
            required: [true, "Please provide mood"]
        },

        date: {
            type: Date,
            required: [true, "Please provide date"],
            default: Date.now
        },

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Please provide a user"]
        }
    },
    { timestamps: true },
);

export default mongoose.model<IVote & mongoose.Document>('Vote', Vote);