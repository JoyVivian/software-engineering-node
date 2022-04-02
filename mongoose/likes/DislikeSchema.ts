/**
 * This module is used to create dislike schema.
 * This schema is similar to LikeSchema. 
 */
import mongoose, {Schema} from "mongoose";
import Like from "../../models/likes/Like";

const DislikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"});
export default DislikeSchema;