import {Container} from 'typedi';
import express from 'express';
import VoteService from "../../../src/services/vote";
import loaders from "../../../src/loaders";
import AuthService from "../../../src/services/auth";

let db = null;

beforeAll(async (done) => {
    const expressApp = express();
    const {mongoConnection} = await loaders({expressApp});
    db = mongoConnection;
    const authService = new AuthService();
    const userInput = {
        firstName: 'User',
        lastName: 'Unit Test',
        email: 'votetest@example.com',
        password: 'test',
    };
    await authService.SignUp(userInput);
    done();
});
afterAll(async (done) => {
    const VoteModel = Container.get('voteModel');
    await VoteModel.deleteMany({});
    const UserModel = Container.get('userModel');
    await UserModel.deleteMany({email: "votetest@example.com"});
    db.connection.close(() => done());
});

describe('Vote service', () => {
    describe('Vote', () => {

        it('should be able to vote', async () => {

            const voteService = new VoteService();
            const voteInput = {
                mood: 'positive',
            };
            const {user, vote} = await voteService.Vote('votetest@example.com', voteInput);
            expect(vote).toBeDefined();
            expect(vote._id).toBeDefined();
            expect(vote.mood).toEqual('positive');
            expect(vote.date).toBeDefined();
            expect(vote.user_id).toBeDefined();
            expect(vote.user_id).toEqual(user._id);
            expect(user.email).toBe("votetest@example.com");
            expect(user.password).not.toBeDefined();
            expect(user.salt).not.toBeDefined();
        });
    });
});