import { Express, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import FollowControllerI from "../interfaces/FollowController";
import FollowDao from "../daos/FollowDao";


export default class  FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post('/api/users/:uid/follows/:followingid'
            , FollowController.followController.userFollowsUser);
            app.delete('/api/users/:uid/follows/:followingid'
            , FollowController.followController.userUnFollowsUser);
            app.get('/api/users/:uid/followed',
             FollowController.followController.findAllFollwedUsers);
            app.get('/api/users/:uid/following',
             FollowController.followController.findAllFollowingUsers);
        }
        return FollowController.followController;
    }

    private constructor () {}

    userFollowsUser(req: Request, res: Response): void {
        FollowController.followDao.userFollowsUser(req.params.uid, req.params.followingid)
        .then(follows => res.json(follows));
    }

    userUnFollowsUser(req: Request, res: Response): void {
        FollowController.followDao.userUnFollowsUser(req.params.uid, req.params.followingid)
        .then(unFollows => res.json(unFollows));
    }

    findAllFollwedUsers(req: Request, res: Response): void {
        FollowController.followDao.findAllFollowedUsers(req.params.uid)
        .then(followers => res.json(followers));
    }

    findAllFollowingUsers(req: Request, res: Response): void {
        FollowController.followDao.findAllFollowingUsers(req.params.uid)
        .then(followings => res.json(followings));
    }

}