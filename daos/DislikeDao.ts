/**
 * @file Implements DAO managing data storage of dislikes. 
 * Uses mongoose DislikeModel interface to integrate with MongoDB.
 */
import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/likes/DislikeModel";
import Like from "../models/likes/Like";

/**
 * @class DislikeDao Implements Data Access Object managing data storage of dislikes of Users.
 * @property {UserDao} userDao Private single instance of UserDao.
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    private constructor() {}

    /**
     * Uses DislikeModel to retrieves users disliked tuits.
     * @param tid Tuit's primary key.
     * @returns Promise to be notified when the users are found.
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Like[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Uses DislikeModel to retrieves tuits disliked by this user.
     * @param uid User's primary key.
     * @returns The Promise to be notified when the tuits are found.
     */        
    findAllTuitsDislikedByUser = async (uid: string): Promise<Like[]> =>
        DislikeModel
            .find({likedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

      /**
     * Uses DislikeModel to create like record.
     * @param uid User's primary key.
     * @param tid Tuit's primary key.
     * @returns The promise to be notified whe the record is created.
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, likedBy: uid});
    
        
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, likedBy: uid});
    
    
    /**
     * Uses DislikeModel to delete record.
     * @param uid User's primary key.
     * @param tid Tuit's primary key.
     * @returns The promise to be notified when the record is deleted.
     */
    userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, likedBy: uid});
    countHowManyLikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});
}