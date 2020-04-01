import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import vote from './routes/vote';

// guaranteed to get dependencies
export default () => {
    const app = Router();
    auth(app);
    user(app);
    vote(app);

    return app
}