import {Container} from 'typedi';
import express from 'express';
import VoteService from "../../../src/services/vote";
import loaders from "../../../src/loaders";
import AuthService from "../../../src/services/auth";

let db = null;


describe('Vote service', () => {
    beforeAll(async (done) => {
        const expressApp = express();
        const {mongoConnection} = await loaders({expressApp});
        db = mongoConnection;
        done();
    });
    afterAll(async (done) => {
        const VoteModel = Container.get('voteModel');
        await VoteModel.deleteMany({});
        const UserModel = Container.get('userModel');
        await UserModel.deleteMany({});
        await db.disconnect();
        done();
    });
    describe('Vote', () => {
        it('should be able to retrieve votes per user based on time frame', async (done) => {
            const VoteModel = Container.get('voteModel');
            const UserModel = Container.get('userModel');
            const Logger = Container.get('logger');

            const voteService = new VoteService(UserModel, VoteModel, Logger);
            await voteService.GenerateVotes();

            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate()-1);
            const lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate()-8);
            const usersYesterday = await voteService.Votes(yesterday);
            const usersLastWeek = await voteService.Votes(lastWeek);

            expect(usersYesterday.votes).toBeDefined();
            console.log(usersYesterday.votes)
            expect(usersYesterday.votes[0].votes).toBeDefined();
            expect(usersYesterday.votes[0].votes.length).toBe(1);
            // console.log(usersYesterday);
            expect(usersLastWeek.votes).toBeDefined();
            expect(usersLastWeek.votes[0].votes).toBeDefined();
            expect(usersLastWeek.votes[0].votes.length).toBe(8);

            done();
        });

        it('should be able to vote', async (done) => {
            const userModel = Container.get('userModel');
            const voteModel = Container.get('voteModel');
            const logger = Container.get('logger');

            const voteService = new VoteService(userModel, voteModel, logger);

            const voteInput = {
                mood: 1,
            };
            const UserModel = Container.get("userModel");
            const Logger = Container.get('logger');
            const authService = new AuthService(UserModel, Logger);
            const userInput = {
                firstName: 'Use4',
                lastName: 'Unit Test4',
                email: 'votetest4@example.com',
                password: 'test4',
            };
            const result = await authService.SignUp(userInput);
            const {user, vote} = await voteService.Vote(result.user._id, voteInput);

            expect(vote).toBeDefined();
            expect(vote._id).toBeDefined();
            expect(vote.mood).toEqual(1);
            expect(vote.date).toBeDefined();
            expect(vote.user_id).toBeDefined();
            expect(vote.user_id).toEqual(user._id);
            expect(user.email).toBe("votetest4@example.com");
            expect(user.password).not.toBeDefined();
            expect(user.salt).not.toBeDefined();
            done();
        });

    });

});