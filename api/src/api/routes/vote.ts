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
            logger.debug('Calling vote endpoint with body: %o', req.body)
            try {
                const voteServiceInstance = Container.get(VoteService);
                const {user, vote} = await voteServiceInstance.Vote(req.currentUser, req.body as IVoteInputDTO);
                return res.status(201).json({user, vote});
            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        }
    );

    route.post(
        '/statistics',
        middlewares.isAuth,
        middlewares.isManager,
        async (req: Request, res: Response, next: NextFunction) => {
            if (!req.isManager) {
                return res.status(403);
            }
            const logger = Container.get('logger');
            logger.debug('Calling vote endpoint with body: %o', req.body)
            try {
                const voteServiceInstance = Container.get(VoteService);
                const {votes} = await voteServiceInstance.Votes(req.body.date as Date);
                return res.status(200).json({votes});
            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        }
    );

    route.get(
        '/generate',
        async (req: Request, res: Response, next: NextFunction) => {
            const logger = Container.get('logger');
            logger.debug('Calling generate endpoint')
            try {
                const voteServiceInstance = Container.get(VoteService);
                const {votes} = await voteServiceInstance.GenerateVotes();
                return res.status(200).json({votes});
            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        }
    )

}