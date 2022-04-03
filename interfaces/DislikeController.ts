import {Request, Response} from "express";

/**
 * @file Declares API for Dislikes related controller methods.
 */
export default interface LikeControllerI {
    findAllUsersThatDislikedTuit (req: Request, res: Response): void;
    findAllTuitsDislikedByUser (req: Request, res: Response): void;
    userTogglesTuitDislikes (req: Request, res: Response): void;
};