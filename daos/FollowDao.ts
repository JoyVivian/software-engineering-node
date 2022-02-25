import FollowDaoI from "../interfaces/FollowDao"
import User from "../models/users/User"
import UserModel from "../mongoose/users/UserModel"


export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    async userUnFollowsUser(uid: string, followingId: string): Promise<any> {
        return await UserModel.findByIdAndUpdate(followingId, {$pull: {followers: uid}}, {new: true});
    }

 
    async findAllFollowedUsers(uid: string): Promise<any> {
        return await UserModel
        .findById(uid)
        .populate('followers')
        .exec();
    }

    async findAllFollowingUsers(uid: string): Promise<User[]> {
        return await UserModel
        .find({followers: uid})
        .exec();
    }

    async userFollowsUser(uid: string, followingId: string): Promise<any> {
        //The purpose of adding {new: true} is to return a document after modification.
        return await UserModel.findByIdAndUpdate(followingId,
        {$push: {followers: uid}}, {new: true});
    }
}