import User from '../models/User'
import mongoose from 'mongoose';

const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedOn: Date,
    postedBy: User
}, {collection: 'tuits'});
export default TuitSchema;