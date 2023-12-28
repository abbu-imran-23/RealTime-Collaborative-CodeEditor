const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const dotenv = require('dotenv');
const ACTIONS = require('./src/Actions');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credential: true
    }
});

const userSocketMap = {};

const getAllConnectedClients = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || [])
    .map(( socketId) => {
        return {
            socketId,
            username: userSocketMap[socketId]
        }
    });
}

io.on("connection", (socket) => {
    console.log("Client Connected ", socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, username}) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);

        const clients = getAllConnectedClients(roomId);
        console.log(clients);

        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id
            })
        })

    })

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    })

    socket.on(ACTIONS.SYNC_CODE, ({ code, socketId }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    })

    socket.on("disconnecting", () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id]
            })
        })
        delete userSocketMap[socket.id];
        socket.leave();
    })

    socket.on("disconnect", () => {
        console.log("Client Disconnected: ", socket.id);
    });
})

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server listening at PORT ${PORT}`);
})

app.get("/", (req, res) => {
    return res.status(200).json({
        "message": `Server running successfully on PORT ${PORT}`
    })
})
