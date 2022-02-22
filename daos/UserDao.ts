import User from "../models/users/User";
import UserModel from "../mongoose/users/UserModel";
import UserDaoI from "../interfaces/UserDao";

export default class UserDao implements UserDaoI {
    private static userDao: UserDao | null = null;

    /**
     * Creates singleton DAO instance.
     * @returns UserDao
     */
    public static getInstance = (): UserDao => {
        if (UserDao.userDao == null) {
            UserDao.userDao = new UserDao();
        }

        return UserDao.userDao;
    }

    private constructor() { };

    /**
     * Uses UserModel to retrieve all user documents from users collection.
     * @returns Promise to be notified when the users are retrieved from database.
     */
    async findAllUsers(): Promise<User[]> {
        return await UserModel.find();
    }

    /**
     * Uses UserModel to retrieve single user documents from users collection.
     * @param uid User's primary key.
     * @returns Promise to be notified when user is retrieved from the database.
     */
    async findUserById(uid: string): Promise<any> {
        return await UserModel.findById(uid);
    }

    /**
     * Insert user instance to database.
     * @param user Instance to be inserted into database.
     * @returns Promise to be notified when user is inserted.
     */
    async createUser(user: User): Promise<User> {
        return await UserModel.create(user);
    }

    /**
     * Removes user from the database.
     * @param uid Primary key of the user to be removed.
     * @returns Promise to be notified when user is removed from the database.
     */
    async deleteUser(uid: string): Promise<any> {
        return await UserModel.deleteOne({ _id: uid });
    }

    /**
     * Updates user with new values in database.
     * @param uid Primary key of user to be modified.
     * @param user User object containing properties and their new values.
     * @returns Promise to be notified when user is updated in the database.
     */
    async updateUser(uid: string, user: User): Promise<any> {
        return await UserModel.updateOne({ _id: uid }, { $set: user });
    }

    /**
     * Removes all users from the database.
     * @returns Promise to be notified when all suers are removed from database.
     */
    async deleteAllUsers(): Promise<any> {
        UserModel.deleteMany({});
    }
}

