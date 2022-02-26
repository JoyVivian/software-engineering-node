import MessageModel from "../mongoose/messages/MessageModel"
import Message from "../models/messages/Message"
import MessageDaoI from "../interfaces/messages/MessageDao"

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() { }

    userSendsMsg = async (fromuid: string, touid: string, msg: string): Promise<any> =>
        MessageModel.create({ fromUser: fromuid, toUser: touid, message: msg});
    
    userDelsMsg = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({ _id: mid });

    findSentMsg = async (uid: string): Promise<Message[]> =>
        MessageModel.find({ fromUser: uid });

    findRecMsg = async (uid: string): Promise<Message[]> =>
        MessageModel.find({ toUser: uid });
}