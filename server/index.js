// server.js
import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const port = 3000;

const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    ws.on("message", (data) => {
        console.log("Received:", data);
        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });

    ws.send("Welcome to the chat!");
});
