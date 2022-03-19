/**
 * @file Controller RESTful web service API for users resource.
 */

import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/users/UserController";
import User from "../models/users/User";

/**
 * @class UserController Implements RESTful Web Service API for users resource.
 * Defines the following HTTP endpoints.
 * <ul>
 *      <li>POST /api/users to create a new user </li>
 *      <li>GET /api/users to retrieve all the users </li>
 *      <li>GET /api/users/:uid to retrieve an individual user </li>
 *      <li>PUT /api/users to modify an individual user </li>
 *      <li>DELETE /api/users/:uid to delete an individual user </li>
 *      <li>GET /api/users/username/:username/delete to delete users with a specific username.</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operating. 
 * @property {UserController} userController Singleton controller implementing 
 * RESTful Web Service API.
 */
export default class UserController implements UserControllerI {
   private static userDao: UserDao = UserDao.getInstance();
   private static userController: UserController | null = null;

   public static getInstance = (app: Express): UserController => {
        if (UserController.userController === null) {
            UserController.userController = new UserController();

            //RESTful User Web Service API.
            app.get("/api/users", UserController.userController.findAllUsers);
            app.get("/api/users/:userid", UserController.userController.findUserById);
            app.post("/api/users", UserController.userController.createUser);
            app.delete("/api/users/:userid", UserController.userController.deleteUser);
            app.put("/api/users/:userid", UserController.userController.updateUser);
            app.delete("/api/users", UserController.userController.deleteAllUsers);
            app.get("/api/users/username/:username/delete", UserController.userController.deleteUsersByUsername);
        }
        return UserController.userController;
   } 

   private constructor() {}

   /**
    * Uses UserModel to retrieve all user documents from user collections.
    * @param res Response instance.
    * @param req Request instance.
    * @returns Promise to be notified when users are retrieved from database.
    */
   findAllUsers = (req: Request, res: Response) =>
       UserController.userDao.findAllUsers()
           .then((users: User[]) => res.json(users));

   /**
    * Uses UserModel to retrieve single user document from user collection.
    * @param req Response instance.
    * @param res Request instance.
    * @returns Promise to be notified when the user is retrieved from database.
    */
   findUserById = (req: Request, res: Response) =>
       UserController.userDao.findUserById(req.params.userid)
           .then(user => res.json(user));

    /**
     * Inserts user instance into database.
     * @param req Response instance.
     * @param res Request instance.
     */
   createUser = (req: Request, res: Response) => {
    UserController.userDao.createUser(req.body)
    .then(user => res.json(user));
   }

   /**
    * Removes user from the database.
    * @param req Response instance.
    * @param res Request instance.
    * @returns Promise to be notified when the user is removed from database.
    *
    */
   deleteUser = (req: Request, res: Response) =>
   UserController.userDao.deleteUser(req.params.userid)
           .then(status => res.send(status));
    
    /**
     * Updates user with new values in database.
     * @param req Response instance.
     * @param res Request instance.
     * @returns Promise to be notified when the user is updated from database.
     */
    updateUser = (req: Request, res: Response) =>
   UserController.userDao.updateUser(req.params.userid, req.body)
           .then(status => res.send(status));

    /**
     * Removed all users from the database.
     * @param req Request instance.
     * @param res Response instance.
     * @returns Promise to be notified when users are removed from database.
     */
    deleteAllUsers = (req: Request, res: Response) =>
    UserController.userDao.deleteAllUsers()
    .then(status => res.send(status));

    /**
     * Removed specific users with a particular username.
     * @param req Request instance.
     * @param res Response instance.
     * @returns Promise to be notified when users are removed from database.
     */
    deleteUsersByUsername = (req: Request, res: Response) => 
    UserController.userDao.deleteUsersByUsername(req.params.username)
    .then(status => res.send(status));
}

