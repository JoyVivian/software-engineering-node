import Tuit from "../tuits/Tuit"
import User from "../users/User"

export default interface BookMark {
    tuit: Tuit,
    bookMarkedBy: User
};