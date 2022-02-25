import { Express, Request, Response } from "express";
import BookMarkDao from "../daos/BookMarkDao"
import BookMarkControllerI from "../interfaces/bookmarks/BookMarkController"


export default class BookMarkController implements BookMarkControllerI {
    private static bookMarkDao: BookMarkDao = BookMarkDao.getInstance();
    private static bookMarkController: BookMarkController | null = null;

    public static getInstance = (app: Express): BookMarkController => {
        if (BookMarkController.bookMarkController === null) {
            BookMarkController.bookMarkController = new BookMarkController();

            app.post("/api/users/:uid/bookmarks/:tid"
            , BookMarkController.bookMarkController.userBookmarksTuit);

            app.delete("/api/users/:uid/bookmarks/:tid"
            , BookMarkController.bookMarkController.userUnBookmarksTuit);

            app.get("/api/users/:uid/bookmarks"
            , BookMarkController.bookMarkController.findAllTuitsBookmarkedByUser);
        }
        return BookMarkController.bookMarkController;
    }

    private constructor() { }

    userBookmarksTuit = (req: Request, res: Response) =>
        BookMarkController.bookMarkDao.userBookmarksTuit(req.params.tid, req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    userUnBookmarksTuit = (req: Request, res: Response) =>
        BookMarkController.bookMarkDao.userUnBookmarksTuit(req.params.tid, req.params.uid)
            .then(status => res.send(status));

    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
        BookMarkController.bookMarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then(tuits => res.json(tuits));

}