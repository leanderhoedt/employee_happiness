import {Container} from 'typedi';
import mongoose from 'mongoose';
import {IUser} from '../../interfaces/IUser';

const isManager = async (req, res, next) => {
    const Logger = Container.get('logger');
    try {
        const UserModel = Container.get('userModel') as mongoose.Model<IUser & mongoose.Document>;
        const userRecord = await UserModel.findById(req.token._id);
        if (!userRecord) {
            return res.sendStatus(401);
        }
        const currentUser = userRecord.toObject();

        req.isManager = currentUser.role === 'manager';
        return next();
    } catch (e) {
        Logger.error('🔥 Error checking if manager', e);
        return next(e);
    }
};

export default isManager;
