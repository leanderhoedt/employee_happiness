import {Container} from 'typedi';
import express from 'express';
import AuthService from '../../../src/services/auth';
import loaders from '../../../src/loaders';

let db = null;


describe('Auth service', () => {
    beforeAll(async (done) => {
        const expressApp = express();
        const {mongoConnection} = await loaders({expressApp});
        db = mongoConnection;
        done();

    });
    describe('SignUp', () => {

        it('should create a user record', async (done) => {
            const userInput = {
                firstName: 'User',
                lastName: 'Unit Test',
                email: 'test@example.com',
                password: 'test',
            };
            const UserModel = Container.get('userModel');
            const Logger = Container.get('logger');
            const authService = new AuthService(UserModel, Logger);

            const {user, token} = await authService.SignUp(userInput);
            expect(user).toBeDefined();
            expect(user._id).toBeDefined();
            expect(user.firstName).toBe("User");
            expect(user.lastName).toBe("Unit Test");
            expect(user.email).toBe("test@example.com");
            expect(user.password).not.toBeDefined();
            expect(user.salt).not.toBeDefined();
            expect(token).toBeDefined();
            done();
        });
    });

    describe('SignIn', () => {
        it('should be able to login', async (done) => {
            const UserModel = Container.get('userModel');
            const Logger = Container.get('logger');
            const authService = new AuthService(UserModel, Logger);
            const {user, token} = await authService.SignIn('test@example.com', 'test');
            expect(user).toBeDefined();
            expect(user._id).toBeDefined();
            expect(user.firstName).toBe("User");
            expect(user.lastName).toBe("Unit Test");
            expect(user.email).toBe("test@example.com");
            expect(user.password).not.toBeDefined();
            expect(user.salt).not.toBeDefined();
            expect(token).toBeDefined();
            done();
        });
        it('should throw an error when email was not registered yet', async (done) => {
            const UserModel = Container.get('userModel');
            const Logger = Container.get('logger');
            const authService = new AuthService(UserModel, Logger);
            await expect(authService.SignIn('unexistingemail@unexisting.com', 'bliepbloep')).rejects.toThrow();
            done();
        });
    });
    afterAll(async (done) => {
        const UserModel = Container.get('userModel');
        await UserModel.deleteMany({});
        await db.disconnect();
        done();
    });
});