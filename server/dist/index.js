"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = express_1.default();
const http = http_1.default.createServer(app);
const ws = socket_io_1.default(http);
dotenv_1.default.config();
app.use(cors_1.default());
const PORT = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Hello!');
});
ws.on('connected', (socket) => {
    console.log('User connected');
    socket.on('disconnected', () => console.log('User disconnected'));
});
http.listen(PORT, () => console.log(`Serves at localhost:${PORT}`));
