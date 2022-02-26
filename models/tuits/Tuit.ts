/**
 * @file Declare Tuit data type representing the tuit.
 */
import User from "../users/User";
import Stats from "./Stats"

/**
 * @typedef Tuit Represents tuit.
 * @property {string} tuit The content of the tuit.
 * @property {User} postedBy The user post the tuit.
 * @property {Date} postedOn The date the tuit has been posted.
 * @property {string} image Image of the tuit.
 * @property {string} youtube Youtube link of the tuit.
 * @property {Stats} stats The status of the tuit.
 */
export default interface Tuit {
   tuit: string,
   postedBy: User,
   postedOn?: Date,
   image?: String,
   youtube?: String,
   avatarLogo?: String,
   imageOverlay?: String,
   stats: Stats
};

