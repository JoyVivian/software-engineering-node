import { Request, Response, Express } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import TuitDao from '../daos/TuitDao';
import TuitControllerI from "../interfaces/tuits/TuitController";
import Tuit from "../models/tuits/Tuit";

export default class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;

    public static getInstance = (app: Express): TuitController => {
        if(TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get("/api/tuits", TuitController.tuitController.findAllTuits);
            app.get("/api/tuits/:tid", TuitController.tuitController.findTuitById);
            app.get("/api/users/:uid/tuits", TuitController.tuitController.findTuitsByUser);
            app.post("/api/users/:uid/tuits", TuitController.tuitController.createTuitByUser);
            app.delete("/api/tuits/:tid", TuitController.tuitController.deleteTuit);
            app.put("/api/tuits/:tid", TuitController.tuitController.updateTuit);
        }
        return TuitController.tuitController;
    }

  
   private constructor() {}

    findAllTuits = (req: Request, res: Response) =>  TuitController.tuitDao.findAllTuits()
    .then((tuits: Tuit[]) => res.json(tuits));

    findTuitById = (req: Request, res: Response) =>  TuitController.tuitDao.findTuitById(req.params.tid)
    .then (tuit => res.json(tuit));

    findTuitsByUser = (req: Request, res: Response) =>  TuitController.tuitDao.findTuitsByUser(req.params.uid)
    .then(tuits => res.json(tuits));

    createTuitByUser = (req: Request, res: Response) =>  TuitController.tuitDao.createTuitByUser(req.params.uid, req.body)
    .then(tuit => res.json(tuit));

    deleteTuit = (req: Request, res: Response) =>  TuitController.tuitDao.deleteTuit(req.params.tid)
    .then(status => res.json(status));

    updateTuit = (req: Request, res: Response) =>  TuitController.tuitDao.updateTuit(req.params.tid, req.body)
    .then(status => res.json(status));

    
};