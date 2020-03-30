import {Service, Inject} from 'typedi';
import {IUser} from "../interfaces/IUser";
import {IVote, IVoteInputDTO} from "../interfaces/IVote";

@Service()
export default class VoteService {
    constructor(
        @Inject('userModel') private userModel,
        @Inject('voteModel') private voteModel,
        @Inject('logger') private logger,
    ) {
    }

    public async Vote(email: string, voteInputDTO: IVoteInputDTO): Promise<{ user: IUser; vote: IVote }> {
        // @TODO: figure out, how to perform in 1 transaction
        this.logger.silly('Creating vote db record');
        const userRecord = await this.userModel.findOne({email});
        if (!userRecord) {
            throw new Error(`Unable to find user ${email}`);
        }
        const voteRecord = await this.voteModel.create({
            ...voteInputDTO,
            user_id: userRecord._id
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