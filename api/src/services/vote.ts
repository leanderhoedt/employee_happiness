import {Service, Inject} from 'typedi';
import {IUser} from "../interfaces/IUser";
import {IVote, IVoteInputDTO} from "../interfaces/IVote";
import mongoose from "mongoose";

@Service()
export default class VoteService {

    @Inject('userModel') private userModel;
    @Inject('voteModel') private voteModel;
    @Inject('logger') private logger;

    public async Vote(userId: mongoose.Schema.Types.ObjectId, voteInputDTO: IVoteInputDTO): Promise<{ user: IUser; vote: IVote }> {
        this.logger.silly('Creating vote db record');
        const userRecord = await this.userModel.findById(userId);
        if (!userRecord) {
            // This would be weird, but COULD happen
            throw new Error(`User that tries to vote does not exist`);
        }
        const voteRecord = await this.voteModel.create({
            ...voteInputDTO,
            user_id: userId
        });
        if (!voteRecord) {
            throw new Error('Vote cannot be created');
        }

        const vote = voteRecord.toObject();

        const user = userRecord.toObject();
        Reflect.deleteProperty(user, 'password');
        Reflect.deleteProperty(user, 'salt');
        return {user, vote};

    }

}