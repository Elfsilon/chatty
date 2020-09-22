import express from 'express';
import SocketIO from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

const app: express.Application = express();

dotenv.config();
app.use(cors({ 
    origin: 'http://localhost:3000',
    credentials: true
}));

const PORT = process.env.PORT;

app.get('/', (req: express.Request, res: express.Response): void => {
    res.send('Hello!');
});

const server = app.listen(PORT, () => console.log(`Serves at localhost:${PORT}`));

// Web sockets
const ws = SocketIO.listen(server);

ws.on('connection', (socket: SocketIO.Socket): void => {
    console.log('User connected');
    socket.on('disconnect', () => console.log('User disconnected'));
    socket.on('new-message', mes => {
        socket.broadcast.emit('push-new-message', mes);
    });
});