import { io } from 'socket.io-client';
import { BASE_URL } from '../utils/apiStrings';

const socket = io(BASE_URL, {
    auth: {
        token: localStorage.getItem('accessToken')
    }
});

export default function getMessage(roomId, setChatList) {
    console.log("Joining room:", roomId);
    socket.emit("joinRoom", roomId);

    const messageHandler = (message) => {
        console.log("New message received:", message);
        setChatList(prev => [...prev, message]);
    };

    socket.on("message", messageHandler);

    return () => {
        console.log("Cleaning up message listener for room:", roomId);
        socket.off("message", messageHandler);
    };
}
