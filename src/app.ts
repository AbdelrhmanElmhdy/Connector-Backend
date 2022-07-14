import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { createServer } from 'http';
import { UserController } from './controllers/UserController';
import { Server } from 'socket.io';
import registerChatMessageHandler from './socketHandlers/ChatMessageHandler';
import { DataSource } from 'typeorm';
import { Message } from './models/Message';
import Contact from './models/Contact';
import ChatRoom from './models/ChatRoom';
import { AuthController } from './controllers/AuthController';
import bodyParser from 'body-parser';
import Location from './models/Location';
import User from './models/User';
// import { saveMessage } from './storage/DatabaseUtils';

// Create express app, register all controller routes.
const app = createExpressServer({
	controllers: [UserController, AuthController],
	cors: {
		origin: '*', // (note: do not use this in production)
	}
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create socket-io server, and register event handlers.
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', socket => {
	registerChatMessageHandler(io, socket);
});

// Create and initialize an sqlite database.
export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "Abdelrhman",
	database: "Abdelrhman",
	entities: [User, ChatRoom, Message, Contact, Location],
	synchronize: true,
	logging: false,
});

AppDataSource.initialize();

// Run application on port 3000
httpServer.listen(3000, 'localhost');
