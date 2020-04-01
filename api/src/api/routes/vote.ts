import {Router, Request, Response, NextFunction} from 'express';
import {Container} from 'typedi';
import middlewares from '../middlewares';
import VoteService from '../../services/vote';
import {IVoteInputDTO} from "../../interfaces/IVote";
const route = Router();

export default (app: Router) => {
    app.use('/vote', route);



    route.post(
        '',
        middlewares.isAuth,
        middlewares.attachCurrentUser,
        async (req: Request, res: Response, next: NextFunction) => {
            const logger = Container.get('logger');
            logger.debug('Calling Sign-Up endpoint with body: %o', req.body )
            try{
                const voteServiceInstance = Container.get(VoteService);
                const  {user, vote} = await voteServiceInstance.Vote(req.currentUser,req.body as IVoteInputDTO);
                return res.status(201).json({ user, vote });
            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        }
    );

}