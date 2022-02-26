/**
 * @file Declare User data type representing user.
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose, {Schema} from "mongoose";


/**
 * @typedef User Represents user.
 * @property {string} username Username of the user.
 * @property {string} password Password of the user.
 * @property {string} firstname First name of the user.
 * @property {string} lastname Last name of the user.
 * @property {string} emil Email of the user. 
 * @property {string} profilePhoto Photo of the user.
 * @property {string} headerImage Head image of the user.
 * @property {AccountType} accountType Account type of the user.
 * @property {MaritalStatus} maritalStatus Marital status of the user.
 * @property {string} biography Biography of the user.
 * @property {Date} dateOfBirth Date of birth of the user.
 * @property {Date} joined Date of joined the user.
 * @property {Location} location Location of the user.
 * @property {Schema.Types.ObjectId} followers The arrays of object ids of followers.
 */
export default class User {
   private username: string = '';
   private password: string = '';
   private firstName: string | null = null;
   private lastName: string | null = null;
   private email: string = '';
   private profilePhoto: string | null = null;
   private headerImage: string | null = null;
   private accountType: AccountType = AccountType.Personal;
   private maritalStatus: MaritalStatus = MaritalStatus.Single;
   private biography: string | null = null;
   private dateOfBirth: Date | null = null;
   private joined: Date = new Date();
   private location: Location | null = null;
   private followers: Schema.Types.ObjectId [] | null = null;
}


