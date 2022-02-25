import BookMarkDaoI from "../interfaces/bookmarks/BookMarkDao"
import BookMark from "../models/bookmarks/Bookmark"
import BookMarkModel from "../mongoose/bookmarks/BookMarkModel";

export default class BookMarkDao implements BookMarkDaoI {
    private static bookMarkDao: BookMarkDao | null = null;
    public static getInstance = (): BookMarkDao => {
        if (BookMarkDao.bookMarkDao === null) {
            BookMarkDao.bookMarkDao = new BookMarkDao();
        }
        return BookMarkDao.bookMarkDao;
    }

    private constructor () {}

    userBookmarksTuit = async (tid: string, uid: string): Promise<BookMark> =>
        BookMarkModel.create({ tuit: tid, bookMarkedBy: uid });
    
    userUnBookmarksTuit = async (tid: string, uid: string): Promise<any> => 
        BookMarkModel.deleteOne({tuit: tid, bookMarkedBy: uid});
    
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<BookMark[]> => 
        BookMarkModel
        .find({'bookMarkedBy': uid})
        .populate('tuit')
        .exec();
}