import { Schema } from "mongoose";

export default interface Message {
    message: string,
    fromUser: Schema.Types.ObjectId,
    toUser: Schema.Types.ObjectId,
    setOn: Date
};