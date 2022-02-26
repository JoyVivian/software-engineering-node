/**
 * @file Implements DAO managing data storage of likes. 
 * Uses mongoose LikeModel interface to integrate with MongoDB.
 */
import LikeDaoI from "../interfaces/likes/LikeDao";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage of likes.of Users.
 * @property {UserDao} userDao Private single instance of UserDao.
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    private constructor() { }

    /**
     * Uses LikeModel to retrieves users liked that tuits.
     * @param tid Tuit's primary key.
     * @returns Promise to be notified when the users are found.
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({ tuit: tid })
            .populate("likedBy")
            .exec();

    /**
     * Uses LikeModel to retrieves tuits liked by this user.
     * @param uid User's primary key.
     * @returns The Promise to be notified when the tuits are found.
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({ likedBy: uid })
            .populate("tuit")
            .exec();

    /**
     * Uses LikeModel to create like record.
     * @param uid User's primary key.
     * @param tid Tuit's primary key.
     * @returns The promise to be notified whe the record is created.
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({ tuit: tid, likedBy: uid });

    /**
     * Uses LikeModel to delete record.
     * @param uid User's primary key.
     * @param tid Tuit's primary key.
     * @returns The promise to be notified when the record is deleted.
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({ tuit: tid, likedBy: uid });
}