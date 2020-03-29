import { Service, Inject } from 'typedi';
import argon2 from 'argon2';
import {randomBytes} from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../config';
import {IUser, IUserInputDTO} from "../interfaces/IUser";

@Service()
export default class AuthService {
    constructor(
        @Inject('userModel') private userModel,
        @Inject('logger') private logger,
    ) {
    }
    public async SignUp(userInputDTO: IUserInputDTO): Promise<{user:IUser; token: string}>{
        try {
            const salt = randomBytes(32);
            this.logger.silly('Hashing password');
            const hashedPassword = await argon2.hash(userInputDTO.password,{salt});
            this.logger.silly('Creating user db record');
            const userRecord = await this.userModel.create({
                ...userInputDTO,
                salt: salt.toString('hex'),
                password: hashedPassword
            });
            this.logger.silly('Generating JWT');
            const token = this.generateToken(userRecord);

            if (!userRecord) {
                throw new Error('User cannot be created');
            }
            const user = userRecord.toObject();
            Reflect.deleteProperty(user, 'password');
            Reflect.deleteProperty(user, 'salt');
            return { user, token };
        } catch (e) {
            this.logger.error(e);
        }
    }

    private generateToken(user) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        /**
         * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
         * The cool thing is that you can add custom properties a.k.a metadata
         * Here we are adding the userId, role and name
         * Beware that the metadata is public and can be decoded without _the secret_
         * but the client cannot craft a JWT to fake a userId
         * because it doesn't have _the secret_ to sign it
         * more information here: https://softwareontheroad.com/you-dont-need-passport
         */
        this.logger.silly(`Sign JWT for userId: ${user._id}`);
        return jwt.sign(
            {
                _id: user._id, // We are gonna use this in the middleware 'isAuth'
                role: user.role,
                name: user.name,
                exp: exp.getTime() / 1000,
            },
            config.jwtSecret,
        );
    }

}