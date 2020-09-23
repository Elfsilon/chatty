import express from 'express';
import SocketIO from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './connection/connection';

const testConnection = async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
testConnection();

const app: express.Application = express();

dotenv.config();
app.use(cors({ 
    origin: process.env.HOST + ':' + process.env.PORT,
    credentials: true
}));

app.get('/', (req: express.Request, res: express.Response): void => {
    res.send('Hello!');
});

const server = app.listen(process.env.PORT, () => console.log(`Serves at ${process.env.HOST}:${process.env.PORT}`));

// Web sockets
const ws = SocketIO.listen(server);

ws.on('connection', (socket: SocketIO.Socket): void => {
    console.log('User connected');
    socket.on('disconnect', () => console.log('User disconnected'));
    socket.on('new-message', mes => {
        socket.broadcast.emit('push-new-message', mes);
    });
});