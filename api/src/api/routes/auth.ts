import {Router, Request, Response, NextFunction} from 'express';
import {Container} from 'typedi';
import middlewares from '../middlewares';
import AuthService from '../../services/auth';
import {IUserInputDTO} from "../../interfaces/IUser";
const route = Router();

export default (app: Router) => {
    app.use('/auth', route);

    route.post(
        '/signup',
        middlewares.validateSignUpRequest,
        middlewares.validateSameEmailDoesntExist,
        async (req: Request, res: Response, next: NextFunction) => {
            const Logger = Container.get('logger');
            try{
                const authServiceInstance = Container.get(AuthService);
                const  {user, token} = await authServiceInstance.SignUp(req.body as IUserInputDTO);
            } catch (e) {
                Logger.error('🔥 error: %o', e);
                return next(e);
            }
        }
    );

    route.post(
        '/signin',
        middlewares.validateLoginRequest,
        async (req: Request, res: Response, next: NextFunction) => {
            const logger = Container.get('logger');
            logger.debug('Calling Sign-In endpoint with body: %o', req.body)
            try {
                const { email, password } = req.body;
                const authServiceInstance = Container.get(AuthService);
                const { user, token } = await authServiceInstance.SignIn(email, password);
                return res.json({ user, token }).status(200);
            } catch (e) {
                logger.error('🔥 error: %o',  e );
                return next(e);
            }
        },
    );
}