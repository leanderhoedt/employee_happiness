import {Container} from 'typedi';
import mongoose from 'mongoose';
import {IUser} from '../../interfaces/IUser';

const validateSameEmailDoesntExist = async (req, res, next) => {
    const Logger = Container.get('logger');
    try {
        const UserModel = Container.get('userModel') as mongoose.Model<IUser & mongoose.Document>;
        const userRecord = await UserModel.findOne({email: req.body.email});
        if (userRecord) {
            return res.status(409).send('Email already registered');
        }
        return next();
    } catch (e) {
        Logger.error('🔥 Error validating user', e);
        return next(e);
    }
};

export default validateSameEmailDoesntExist;