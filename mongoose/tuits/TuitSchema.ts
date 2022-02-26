/**
 * @file Implements mongoose schema.
 */
import mongoose, {Schema} from 'mongoose';
import Tuit from '../../models/tuits/Tuit';

const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    image: String,
    youtube: String,
    avatarLogo: String,
    imageOverlay: String,
    stats: {
        replies: Number,
        retuits: Number,
        likes: Number
    }
}, {collection: 'tuits'});
export default TuitSchema;