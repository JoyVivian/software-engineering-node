import {Request, Response} from "express";

/**
 * @file Declare API for Likes related controller functions.
 */
 export default interface LikeController {
    findAllUsersThatLikedTuit (req: Request, res: Response): void;
    findAllTuitsLikedByUser (req: Request, res: Response): void;
    userLikesTuit (req: Request, res: Response): void;
    userUnlikesTuit (req: Request, res: Response): void;
};