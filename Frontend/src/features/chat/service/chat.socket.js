import { io } from "socket.io-client";

let socket = null;
const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const initializeSocketConnection = () => {
    if (!socket) {
        socket = io(URL, {
            withCredentials: true,
        })

        socket.on("connect", () => {
            console.log("Connected to Socket.IO server")
        })
    }
    return socket;
}

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
        console.log("Disconnected from Socket.IO server")
    }
}