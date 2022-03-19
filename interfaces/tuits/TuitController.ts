/**
 * @file Declares API for Tuits related controller methods
 */
import {Request, Response} from "express";

export default interface TuitController {
   findAllTuits(req: Request, res: Response): void;
   findTuitById(req: Request, res: Response): void;
   findTuitsByUser(req: Request, res: Response): void;
   createTuitByUser(req: Request, res: Response): void;
   updateTuit(req: Request, res: Response): void;
   deleteTuit(req: Request, res: Response): void;
   deleteAllTuits(req: Request, res: Response): void;
}

