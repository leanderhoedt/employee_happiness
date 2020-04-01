import {Service, Inject, Container} from 'typedi';
import {IUser} from "../interfaces/IUser";
import {IVote, IVoteInputDTO} from "../interfaces/IVote";
import mongoose from "mongoose";
import AuthService from "./auth";

@Service()
export default class VoteService {
    constructor(
        @Inject('userModel') private userModel,
        @Inject('voteModel') private voteModel,
        @Inject('logger') private logger
    ) {
        this.userModel = userModel;
        this.voteModel = voteModel;
        this.logger = logger;
    }

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

    public async Votes(date: Date): Promise<{ votes: IUser[] }> {
        this.logger.silly('Retrieving votes');
        console.log(date);

        const votes = await this.userModel.aggregate([
            {
                $lookup: {
                    from: 'votes',
                    let: {user_id: "$_id"},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {$eq: ["$user_id", "$$user_id"]}
                                    ]
                                },
                                date:{
                                    $gte: date
                                }
                            }
                        },
                        {$sort: {date: 1}}
                    ],
                    as: 'votes'
                }
            }
        ]);
        if (!votes) {
            throw new Error('Votes could not be retrieved');
        }
        return {votes}
    }

    public async GenerateVotes(): Promise<{ votes: IVote[] }> {
        const UserModel = Container.get("userModel");
        const Logger = Container.get('logger');

        const authService = new AuthService(UserModel, Logger);
        const result1 = await authService.SignUp({
            firstName: 'Tester1',
            lastName: 'Tester1',
            email: 'tester1@testerke.com',
            password: 'test'
        });
        const result2 = await authService.SignUp({
            firstName: 'Tester2',
            lastName: 'Tester2',
            email: 'tester2@testerke.com',
            password: 'test2'
        });
        const result3 = await authService.SignUp({
            firstName: 'Tester3',
            lastName: 'Tester3',
            email: 'tester3@testerke.com',
            password: 'test3',
            role: 'manager'
        });
        let insertVotes = [];
        const today = new Date();

        for (let i = 0; i < 40; i++) {
            let previousDate = new Date(today);
            previousDate.setDate(today.getDate()-i);
            insertVotes.push({
                mood: Math.floor(Math.random() * 3),
                date: previousDate,
                user_id: result1.user._id
            });
            insertVotes.push({
                mood: Math.floor(Math.random() * 3),
                date: previousDate,
                user_id: result2.user._id
            });
            insertVotes.push({
                mood: Math.floor(Math.random() * 3),
                date: previousDate,
                user_id: result3.user._id
            });
        }
        const votes = await this.voteModel.insertMany(insertVotes);
        return {votes};
    }

}