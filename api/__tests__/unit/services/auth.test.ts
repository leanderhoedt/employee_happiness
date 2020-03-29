import {Container} from 'typedi';
import express from 'express';
import AuthService from '../../../src/services/auth';
import loaders from '../../../src/loaders';

describe('Auth service', () => {
    beforeEach(async (done)=> {
        const expressApp = express();
        await loaders({expressApp});
        const UserModel = Container.get('userModel');
        await UserModel.deleteMany({email: "test@example.com"});
        done();

    });
    describe('SignUp', () => {
        test('should create user record', async (done) => {
            const userInput = {
                firstName: 'User',
                lastName: 'Unit Test',
                email: 'test@example.com',
                password: 'test',
            };

            const UserModel = Container.get('userModel');
            const Logger = Container.get('logger');

            const authService = new AuthService(UserModel, Logger);
            const userRecord = await authService.SignUp(userInput);
            expect(userRecord).toBeDefined();
            expect(userRecord.user._id).toBeDefined();
            expect(userRecord.user.firstName).toBe("User");
            expect(userRecord.user.lastName).toBe("Unit Test");
            expect(userRecord.user.email).toBe("test@example.com");
            expect(userRecord.user.password).not.toBeDefined();
            expect(userRecord.user.salt).not.toBeDefined();
            expect(userRecord.token).toBeDefined();
            done();
        })
    });
});