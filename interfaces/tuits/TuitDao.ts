/**
 * @file Declares API for tuits related data access object methods
 */
import Tuit from "../../models/tuits/Tuit";

export default interface TuitDao {
    findAllTuits(): Promise<Tuit[]>;
    findTuitsByUser(uid: string) : Promise<Tuit[]>;
    findTuitById(tid: string) : Promise<Tuit | null>;
    createTuitByUser(uid: string, tuit: Tuit) : Promise<Tuit>;
    updateTuit(tid: string, tuit: Tuit) : Promise<any>;
    deleteTuit(tid: string) : Promise<any>;
    deleteAllTuits() : Promise<any>;
}