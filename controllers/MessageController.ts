import { Express, Request, Response } from "express";
import MessageDao from "../daos/MessageDao"
import MessageControllerI from "../interfaces/messages/MessageController"

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            
            app.post("/api/users/:fromuid/messages/:touid"
            , MessageController.messageController.userSendsMsg);
            
            app.delete("/api/messages/:mid"
            , MessageController.messageController.userDelsMsg);

            app.get("/api/users/:uid/sends"
            , MessageController.messageController.findSentMsg);

            app.get("/api/users/:uid/recvs"
            , MessageController.messageController.findRecMsg);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    userSendsMsg = (req: Request, res: Response) =>
        MessageController.messageDao
            .userSendsMsg(req.params.fromuid, req.params.touid, req.body.msg)
            .then(message => res.json(message));

    userDelsMsg = (req: Request, res: Response) =>
        MessageController.messageDao.userDelsMsg(req.params.mid)
        .then(status => res.send(status));

    findSentMsg = (req: Request, res: Response) =>
        MessageController.messageDao.findSentMsg(req.params.uid)
        .then(messages => res.json(messages));

    findRecMsg = (req: Request, res: Response) =>
        MessageController.messageDao.findRecMsg(req.params.uid)
        .then(messages => res.json(messages));
}
