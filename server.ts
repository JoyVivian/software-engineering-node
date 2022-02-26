import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import TuitDao from './daos/TuitDao';
import mongoose from 'mongoose';
import LikeController from './controllers/LikeController';
import FollowController from './controllers/FollowController'
import BookMarkController from './controllers/BookMarkController'
import MessageController from './controllers/MessageController'


//mongoose.connect("mongodb://localhost:27017/tuiter");
mongoose.connect('mongodb+srv://JoyVivian:997630Zw*@cluster0.pha8g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => 
    res.send('Welcome!')
);

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = UserController.getInstance(app);
const tuitDao = new TuitDao();

const tuitController = TuitController.getInstance(app);

const likesController = LikeController.getInstance(app);

const followController = FollowController.getInstance(app);

const bookMarkController = BookMarkController.getInstance(app);

const messageController = MessageController.getInstance(app);
const PORT = 4000;
app.listen(process.env.PORT || PORT);
