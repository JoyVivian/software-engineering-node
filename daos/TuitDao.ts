/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/tuits/Tuit";
import TuitModel from "../mongoose/tuits/TuitModel";
import TuitDaoI from "../interfaces/tuits/TuitDao";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits.
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }

        return TuitDao.tuitDao;
    }

    private cpnstructor() {}

    /**
     * Uses TuitModel to retrieve all tuits.
     * @returns Promise to be notified when all tuits are retrieved.
     */
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }

    /**
     * Use TuitModel to retrieve tuits post by a specific user.
     * @param uid The user's primary key.
     * @returns Promise to be notified when all tuits are retrieved.
     */
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return await TuitModel.find({postedBy: uid});
    }

    /**
     * Use TuitModel to retrieve one tuit by its primary key.
     * @param tid The primary key of the tuit.
     * @returns Promise to be notified when the tuit has been retrieved.
     */
    async findTuitById(tid: string): Promise<Tuit | null> {
        return await TuitModel.findById(tid);
    }

    /**
     * Use TuitModel to create tuit posted by a specific user.
     * @param uid The primary key of the user.
     * @param tuit The tuit object.
     * @returns Promise to be notified when the tuit is created.
     */
    async createTuitByUser(uid: string, tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create({...tuit, postedBy: uid});
    }

    /**
     * Use TuitModel to update a tuit.
     * @param tid The primary key of the tuit.
     * @param tuit New tuit object.
     * @returns Promise to be notified when the update is completed.
     */
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set: tuit});
    }

    /**
     * Use TuitModel to delete a tuit.
     * @param tid The primary key of the tuit.
     * @returns Promise to be notified when the delete is completed.
     */
    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }
    
}